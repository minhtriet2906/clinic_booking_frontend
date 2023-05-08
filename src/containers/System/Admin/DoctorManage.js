import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import { connect } from 'react-redux';
import './DoctorManage.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getDoctorDetailsService } from '../../../services/userService';



const mdParser = new MarkdownIt(/* Markdown-it options */);


class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            doctorOptions: []
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let optionsList = this.createDoctorsListOptions(this.props.doctors);
            this.setState({
                doctorOptions: optionsList,
            })
        }

        if (prevProps.language !== this.props.language) {
            let optionsList = this.createDoctorsListOptions(this.props.doctors);
            this.setState({
                doctorOptions: optionsList,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        console.log('handleEditorChange', html, text);
    }

    handleSaveMarkdownContent = () => {
        console.log('save', this.state);
        let doctorInfo = {
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        }
        this.props.saveDoctorInfo(doctorInfo);
    }

    handleSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor })

        let res = await getDoctorDetailsService(selectedDoctor.value);
        if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
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
        console.log('doctor ', selectedDoctor.value);
    }

    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    createDoctorsListOptions = (data) => {
        let doctorOptions = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                option.value = item.id;

                doctorOptions.push(option);
            })
        }
        return doctorOptions;
    }

    render() {
        return (
            <div className='doctor-manage-container'>
                <div className='doctor-manage-title'>
                    Create doctor Info
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Choose doctor</label>
                        <Select
                            onChange={this.handleSelectDoctor}
                            options={this.state.doctorOptions}
                            value={this.state.selectedDoctor}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Intro: </label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleChangeDescription(event)}
                            value={this.state.description}>
                            abc
                        </textarea>
                    </div>
                </div>
                <div className='doctor-manage-editor'>

                </div>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown} />

                <button
                    className='save-doctor-content'
                    onClick={() => this.handleSaveMarkdownContent()}>
                    Save info
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
        saveDoctorInfo: (data) => dispatch(actions.saveDoctorInfo(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
