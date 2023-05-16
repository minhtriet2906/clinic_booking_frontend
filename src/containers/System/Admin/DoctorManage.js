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
            description: '',

            doctorOptions: [],
            selectedDoctor: null,

            bookingPrices: [],
            selectedPrice: null,

            paymentMethods: [],
            selectedPayment: null,

            provinces: [],
            selectedProvince: null,
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getBookingPrices();
        this.props.getPaymentMethods();
        this.props.getProvinces();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors ||
            prevProps.language !== this.props.language) {
            let doctorsList = this.createDoctorsListOptions(this.props.doctors);

            this.setState({
                doctorOptions: doctorsList,
            })
        }

        if (prevProps.bookingPrices !== this.props.bookingPrices ||
            prevProps.paymentMethods !== this.props.paymentMethods ||
            prevProps.provinces !== this.props.provinces ||
            prevProps.language !== this.props.language) {

            let bookingPricesList = this.createAllcodeTypeOptions(this.props.bookingPrices);
            let paymentMethodsList = this.createAllcodeTypeOptions(this.props.paymentMethods);
            let provincesList = this.createAllcodeTypeOptions(this.props.provinces);

            this.setState({
                bookingPrices: bookingPricesList,
                paymentMethods: paymentMethodsList,
                provinces: provincesList,
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

    handleSelectBookingPrices = async (selectedPrice) => {
        console.log(selectedPrice);
        await this.setState({ selectedPrice })
        console.log(this.state.selectedPrice);
    }

    handleSelectPaymentMethod = async (selectedPayment) => {
        console.log(selectedPayment);
        await this.setState({ selectedPayment })
        console.log(this.state.selectedPayment);
    }

    handleSelectProvince = async (selectedProvince) => {
        console.log(selectedProvince);
        await this.setState({ selectedProvince })
        console.log(this.state.selectedProvince);
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


    createAllcodeTypeOptions = (data) => {
        let optionsList = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};

                option.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                option.value = item.keyMap;

                optionsList.push(option);
            })
        }
        return optionsList;
    }



    render() {
        return (
            <div className='doctor-manage-container'>
                <div className='doctor-manage-title'>
                    <FormattedMessage id="admin.manage-doctor-infor.title"></FormattedMessage>
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor-infor.choose-doctor"></FormattedMessage></label>
                        <Select
                            onChange={this.handleSelectDoctor}
                            options={this.state.doctorOptions}
                            value={this.state.selectedDoctor}
                            placeholder="Choose doctor"
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor-infor.introduction"></FormattedMessage></label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleChangeDescription(event)}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className='doctor-price form-group'>
                    <div className="col-4 price">
                        <label><FormattedMessage id="admin.manage-doctor-infor.price"></FormattedMessage></label>
                        <Select
                            onChange={this.handleSelectBookingPrices}
                            options={this.state.bookingPrices}
                            value={this.state.selectedPrice}
                            placeholder="Choose booking price"
                        />
                    </div>
                    <div className="col-4 payment">
                        <label><FormattedMessage id="admin.manage-doctor-infor.payment"></FormattedMessage></label>
                        <Select
                            onChange={this.handleSelectPaymentMethod}
                            options={this.state.paymentMethods}
                            value={this.state.selectedPayment}
                            placeholder="Select payment"
                        />
                    </div>
                    <div className="col-4 note">
                        <label><FormattedMessage id="admin.manage-doctor-infor.note"></FormattedMessage></label>
                        <input className='form-control'></input>
                    </div>
                </div>
                <div className='doctor-clinic'>
                    <div className='col-4 clinic-name'>
                        <label><FormattedMessage id="admin.manage-doctor-infor.clinic-name"></FormattedMessage></label>
                        <input className='form-control'></input>
                    </div>
                    <div className='col-4 clinic-address'>
                        <label><FormattedMessage id="admin.manage-doctor-infor.clinic-address"></FormattedMessage></label>
                        <input className='form-control'></input>
                    </div>
                    <div className='col-4 province'>
                        <label><FormattedMessage id="admin.manage-doctor-infor.province"></FormattedMessage></label>
                        <Select
                            onChange={this.handleSelectProvince}
                            options={this.state.provinces}
                            value={this.state.selectedProvince}
                            placeholder="Select province"
                        />
                    </div>
                </div>
                <div>

                </div>
                <div className='doctor-manage-editor'>
                    <FormattedMessage id="admin.manage-doctor-infor.detail-infor"></FormattedMessage>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
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
        doctors: state.admin.doctors,
        bookingPrices: state.admin.bookingPrices,
        paymentMethods: state.admin.paymentMethods,
        provinces: state.admin.provinces
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
        saveDoctorInfo: (data) => dispatch(actions.saveDoctorInfo(data)),
        getBookingPrices: () => dispatch(actions.fetchBookingPrices()),
        getPaymentMethods: () => dispatch(actions.fetchPaymentMethods()),
        getProvinces: () => dispatch(actions.fetchProvinces()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
