import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import { Modal } from 'reactstrap';
import DoctorProfile from '../DoctorProfile';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions"
import _ from 'lodash';
import { saveBookingAppointmentService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phonenumber: '',
            address: '',
            reason: '',
            birthday: '',
            genders: [],
            gender: '',
            doctorId: '',
            isLoading: false,
        }
    }

    async componentDidMount() {
        this.props.getGenders();
        this.setState({
            doctorId: this.props.doctorId
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            let gendersArr = this.props.genders;
            this.setState({
                genders: gendersArr,
                gender: gendersArr && gendersArr.length > 0 ? gendersArr[0].keyMap : ''
            })
        }

        if (this.props.bookingTime !== prevProps.bookingTime) {
            if (this.props.bookingTime && !_.isEmpty(this.props.bookingTime)) {
                this.setState({
                    doctorId: this.props.doctorId
                })
            }
        }
    }

    handleOnChangeInput = (event, type) => {
        let inputValue = event.target.value;
        let copyState = { ...this.state };

        copyState[type] = inputValue;

        this.setState({
            ...copyState
        })
    }

    handleSelectDatePicker = async (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleConfirmBooking = async () => {
        console.log('save booking info ', this.state);
        let timeString = this.getBookingTime(this.props.bookingTime);
        let doctorName = this.getDoctorName(this.props.bookingTime);
        console.log(doctorName);
        //validate input
        if (!this.validateInput()) {
            return;
        }

        this.setState({
            isLoading: true
        })

        let res = await saveBookingAppointmentService({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            address: this.state.address,
            reason: this.state.reason,
            birthday: this.state.birthday,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            timeType: this.props.bookingTime.timeType,
            date: this.props.bookingTime.date,
            timeString: timeString,
            doctorName: doctorName,
            language: this.props.language,
        })

        if (res && res.errorCode === 0) {
            toast.success('You have successfully booked a new appointment!');
            this.setState({
                isLoading: false
            })
        } else {
            console.log('error', res);
            toast.error('Error!');
        }

    }

    validateInput = () => {
        let checkInfo = ['email', 'firstName', 'lastName', 'phonenumber', 'address', 'birthday', 'gender'];
        let isValid = true;

        //missing input
        for (let i = 0; i < checkInfo.length; i++) {
            if (!this.state[checkInfo[i]]) {
                isValid = false;
                alert('Missing input ' + checkInfo[i]);
                break;
            }
        }

        return isValid;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getBookingTime = (bookingTime) => {
        let language = this.props.language;
        let date = {};
        let timeVi = '', timeEn = '';

        if (bookingTime && bookingTime.timeTypeData) {
            timeVi = `${bookingTime.timeTypeData.valueVi} `;
            timeEn = `${bookingTime.timeTypeData.valueEn}`;
        }

        if (bookingTime.date) {
            if (language === LANGUAGES.VI) {
                date.label = moment(bookingTime.date).format('dddd - DD/MM/YYYY');
                date.label = this.capitalizeFirstLetter(date.label);
            }
            else {
                date.label = moment(bookingTime.date).locale('en').format('dddd - DD/MM/YYYY');

            }
            return ` ${language === LANGUAGES.VI ? timeVi : timeEn} - ${date.label}`
        }
        return '';
    }

    getDoctorName = (bookingTime) => {
        let { language } = this.props;
        if (bookingTime) {
            let name = language === LANGUAGES.VI ?
                `${bookingTime.doctorData.lastName} ${bookingTime.doctorData.firstName}`
                :
                `${bookingTime.doctorData.firstName} ${bookingTime.doctorData.lastName}`

            return name;
        }
        return '';
    }

    render() {
        let { isOpenBookingModal, closeBookingModal, bookingTime } = this.props;
        let gendersList = this.state.genders;
        console.log(bookingTime);
        return (
            <>
                <Modal isOpen={isOpenBookingModal}
                    className='booking-modal-container'
                    size='lg'
                    centered>
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id="patient.booking-modal.title"></FormattedMessage>
                            </span>
                            <span className='note'>
                                <br></br>
                                <FormattedMessage id="patient.booking-modal.note"></FormattedMessage>
                            </span>
                            <span className='right'
                                onClick={closeBookingModal}>
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-info'>
                                <DoctorProfile
                                    doctorId={this.props.doctorId}
                                    isShowDoctorDescription={false}
                                    bookingTime={bookingTime}
                                    isShowDoctorDetails={false}
                                    isShowBookingPrice={true}>
                                </DoctorProfile>
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.first-name"></FormattedMessage></label>
                                    <input className='form-control'
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'firstName')}>
                                    </input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.last-name"></FormattedMessage></label>
                                    <input className='form-control'
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'lastName')}>
                                    </input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.phonenumber"></FormattedMessage></label>
                                    <input className='form-control'
                                        value={this.state.phonenumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phonenumber')}></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.email"></FormattedMessage></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.address"></FormattedMessage></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.reason"></FormattedMessage></label>
                                    <textarea className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}></textarea>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.birthday"></FormattedMessage></label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleSelectDatePicker}
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.gender"></FormattedMessage></label>
                                    <select name="gender" className="form-control"
                                        value={this.state.gender} onChange={(event) => { this.handleOnChangeInput(event, 'gender') }}>
                                        {gendersList && gendersList.length > 0 && gendersList.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                                onClick={this.handleConfirmBooking}>
                                <FormattedMessage id="patient.booking-modal.confirm"></FormattedMessage>
                            </button>
                            <button className='btn-booking-cancel'
                                onClick={closeBookingModal}>
                                <FormattedMessage id="patient.booking-modal.cancel"></FormattedMessage>
                            </button>
                        </div>
                    </div>
                    <LoadingOverlay
                        active={this.state.isLoading}
                        spinner
                        text='Creating Medical Appointment'>
                    </LoadingOverlay>
                </Modal >
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
