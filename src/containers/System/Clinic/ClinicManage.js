import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { getClinicDetailsService, saveClinicService } from '../../../services/userService';
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ClinicManage.scss'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicOptions: [],
            selectedClinic: null,
            name: '',
            note: '',
            address: '',

            contentHTML: '',
            contentMarkdown: '',
            description: '',

            action: CRUD_ACTIONS.EDIT,
        }
    }

    async componentDidMount() {
        this.props.getAllClinics();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinics !== this.props.clinics ||
            prevProps.language !== this.props.language) {
            let clinicsList = this.createClinicsListOptions(this.props.clinics);

            this.setState({
                clinicOptions: clinicsList,
            })
        }
    }

    createClinicsListOptions = (data) => {
        let clinicOptions = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                option.label = item.name;
                option.address = item.address;
                option.value = item.id;

                clinicOptions.push(option);
            })
        }

        console.log('options', clinicOptions);
        return clinicOptions;
    }

    handleSelectClinic = async (selectedClinic) => {
        console.log('clinic', selectedClinic.value);
        await this.setState({ selectedClinic })
        console.log(this.state);

        let res = await getClinicDetailsService(selectedClinic.value);

        console.log('res', res);

        if (res && res.errorCode === 0 && res.data) {
            this.setState({
                name: res.data.name,
                address: res.data.address,
                note: res.data.note,
            });

            if (res.data.Markdown) {
                let markdown = res.data.Markdown;
                this.setState({
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description
                })
            }
            else {
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: ''
                })
            }
        }
    }


    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                image: base64,
            })
        }
    }

    openPreviewImage = (event) => {
        if (!this.state.previewImgURL) {
            return;
        }

        this.setState({
            isOpen: true
        })
    }

    handleOnChangeInput = (event, inputType) => {
        let copyState = { ...this.state };

        copyState[inputType] = event.target.value;

        this.setState({
            ...copyState
        })
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        console.log('handleEditorChange', html, text);
    }


    handleChangeSaveMode = () => {
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            this.setState({
                action: CRUD_ACTIONS.CREATE
            })
        } else {
            this.setState({
                action: CRUD_ACTIONS.EDIT
            })
        }
    }

    handleSaveClinicInfo = async () => {
        let { selectedClinic } = this.state;
        console.log(selectedClinic);
        let clinicInfo = {
            name: this.state.name,
            address: this.state.address,
            note: this.state.note,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            image: this.state.image,
        }

        console.log('info', clinicInfo);

        let res = await saveClinicService(clinicInfo);

        if (res && res.errorCode === 0) {
            toast.success('Clinic info saved');
        } else {
            toast.error(`Error! ${res.message}`);
        }
    }


    render() {
        console.log(this.state);
        return (
            <div className='clinic-manage-container'>
                <div className='clinic-manage-title'>
                    Clinics Management
                </div>
                <button
                    className='change-save-mode'
                    onClick={() => this.handleChangeSaveMode()}>
                    {this.state.action === CRUD_ACTIONS.EDIT ?
                        'Create new clinic' : 'Edit clinic'}
                </button>
                <div className='clinic row'>
                    {this.state.action === CRUD_ACTIONS.EDIT ?
                        <div className='col-4 form-group'>
                            <label>Choose Clinic</label>
                            <Select
                                onChange={this.handleSelectClinic}
                                options={this.state.clinicOptions}
                                value={this.state.selectedClinic}
                                placeholder="Choose clinic"
                            />
                        </div>
                        :
                        <div className='col-4 form-group'>
                            <label>Clinic Name: </label>
                            <input className='form-control' rows='4'
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                value={this.state.name}>
                            </input>
                        </div>
                    }
                    <div className='col-6 form-group'>
                        <label>Address</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            value={this.state.address}>
                        </textarea>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Description</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeInput(event, 'description')}
                            value={this.state.description}>
                        </textarea>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeInput(event, 'note')}
                            value={this.state.note}>
                        </textarea>
                    </div>
                    <div className='col-4'>
                        <label>Image</label>
                        <div className='preview-img-container'>
                            <input id='preview-img' type='file' hidden
                                onChange={(event) => this.handleOnChangeImage(event)} />

                            <label className='label-upload' htmlFor='preview-img'>Tai anh <i className='fas fa-upload'></i></label>

                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick={() => this.openPreviewImage()}>
                            </div>
                        </div>
                    </div>
                </div >
                <div className='clinic-manage-editor'>
                    <FormattedMessage id="admin.manage-doctor-infor.detail-infor"></FormattedMessage>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button
                    className='save-clinic-content'
                    onClick={() => this.handleSaveClinicInfo()}>
                    Save info
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        clinics: state.admin.clinics,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinics: () => dispatch(actions.fetchAllClinics()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
