import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import { saveMedicalSpecialtyService, getSpecialtyDetailsService } from '../../../services/userService';
import { toast } from 'react-toastify';
import "./SpecialtyManage.scss"

const mdParser = new MarkdownIt(/* Markdown-it options */);


class SpecialtyManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyOptions: [],
            selectedSpecialty: null,

            name: '',
            note: '',
            image: '',
            previewImgURL: '',
            isOpen: false,

            contentMarkdown: '',
            contentHTML: '',
            description: '',

            action: CRUD_ACTIONS.EDIT,

        }
    }

    async componentDidMount() {
        this.props.getAllSpecialties();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.specialties !== this.props.specialties ||
            prevProps.language !== this.props.language) {
            let specialtiesList = this.createSpecialtiesListOptions(this.props.specialties);

            this.setState({
                specialtyOptions: specialtiesList,
            })
        }
    }

    createSpecialtiesListOptions = (data) => {
        let specialtyOptions = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                option.label = item.name;
                option.note = item.note;
                option.value = item.id;

                specialtyOptions.push(option);
            })
        }

        console.log('options', specialtyOptions);
        return specialtyOptions;
    }

    handleSelectSpecialty = async (selectedSpecialty) => {
        await this.setState({ selectedSpecialty });

        let res = await getSpecialtyDetailsService(selectedSpecialty.value);

        if (res && res.errorCode === 0 && res.data) {
            this.setState({
                name: res.data.name,
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


    handleSaveSpecialtyInfo = async () => {

        let specialtyInfo = {
            name: this.state.name,
            note: this.state.note,
            image: this.state.image,

            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,

        }

        let res = await saveMedicalSpecialtyService(specialtyInfo);
        if (res && res.errorCode === 0) {
            toast.success('Medical Specialty saved');
        } else {
            toast.error(`Error! ${res.message}`);
        }
    }

    render() {
        return (
            <>
                {
                    this.props.user.role === "R1" ?
                        <div className='specialty-manage-container'>
                            <div className='specialty-manage-title'>
                                Specialties Management
                            </div>
                            <button
                                className='change-save-mode'
                                onClick={() => this.handleChangeSaveMode()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    'Create new specialty' : 'Edit specialty'}
                            </button>
                            <div className='add-new-specialty row'>
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    <div className='col-4 form-group'>
                                        <label>Choose Specialty</label>
                                        <Select
                                            onChange={this.handleSelectSpecialty}
                                            options={this.state.specialtyOptions}
                                            value={this.state.selectedSpecialty}
                                            placeholder="Choose specialty"
                                        />
                                    </div>
                                    :
                                    <div className='col-4 form-group'>
                                        <label>Specialty Name</label>
                                        <input className='form-control'
                                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                            value={this.state.name}>
                                        </input>
                                    </div>
                                }

                                <div className='col-6 form-group'>
                                    <label>Description</label>
                                    <textarea className='form-control' rows='4'
                                        onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                        value={this.state.description}>
                                    </textarea>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Note</label>
                                    <textarea className='form-control' rows='4'
                                        onChange={(event) => this.handleOnChangeInput(event, 'note')}
                                        value={this.state.note}>
                                    </textarea>
                                </div>
                                <div className='col-6'>
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
                            </div>
                            <div className='specialty-manage-editor'>
                                <MdEditor
                                    style={{ height: '300px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown} />
                            </div>
                            <button
                                className='save-specialty-content'
                                onClick={() => this.handleSaveSpecialtyInfo()}>
                                Save info
                            </button>
                            {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </div >
                        :
                        <div className='access-denied'>
                            <FormattedMessage id="login.access-denied"></FormattedMessage>
                        </div>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        specialties: state.admin.specialties,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
