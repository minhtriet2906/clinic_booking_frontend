import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorProfile.scss'
import { FormattedMessage } from 'react-intl';
import { getDoctorProfileService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import moment from 'moment';

class DoctorProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorProfile: {}
        }
    }

    async componentDidMount() {
        let profile = await this.getDoctorProfileInfo(this.props.doctorId);
        this.setState({
            doctorProfile: profile
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {

        }
    }

    getDoctorProfileInfo = async (doctorId) => {
        let profileInfo = {};
        if (doctorId) {
            let res = await getDoctorProfileService(doctorId);
            if (res && res.errorCode === 0) {
                profileInfo = res.data;
            }
        }

        return profileInfo;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderBookingTime = (bookingTime, language) => {
        let date = {};
        let timeVi = '', timeEn = ''

        if (bookingTime && bookingTime.timeTypeData) {
            timeVi = `${bookingTime.timeTypeData.valueVi} `;
            timeEn = `${bookingTime.timeTypeData.valueEn}`;
        }

        if (bookingTime.date) {
            if (language === LANGUAGES.VI) {
                date.label = moment(bookingTime.date).format('dddd - DD/MM');
                date.label = this.capitalizeFirstLetter(date.label);
            }
            else {
                date.label = moment(bookingTime.date).locale('en').format('dddd - DD/MM');

            }
            date.value = moment(bookingTime.date);
        }

        return (
            <>
                {language === LANGUAGES.VI ? timeVi : timeEn}
                {` - `}
                {date.label}
            </>
        )
    }

    render() {
        console.log(this.state.doctorProfile);
        let { doctorProfile } = this.state;
        let { language, isShowDoctorDescription, bookingTime } = this.props;

        let nameVi = '', nameEn = '';

        if (doctorProfile && doctorProfile.positionData) {
            nameVi = `${doctorProfile.positionData.valueVi} ${doctorProfile.lastName} ${doctorProfile.firstName}`;
            nameEn = `${doctorProfile.positionData.valueEn} ${doctorProfile.firstName} ${doctorProfile.lastName}`;
        }

        return (
            <div className='doctor-profile-container'>
                <div className='doctor-intro'>
                    <div className='left-content'
                        style={{ backgroundImage: `url(${doctorProfile && doctorProfile.image ? doctorProfile.image : null})` }}
                    >
                    </div>
                    <div className='right-content'>
                        <div className='doctor-name'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='doctor-summary'>
                            {isShowDoctorDescription === true ?
                                <>
                                    {doctorProfile && doctorProfile.Markdown && doctorProfile.Markdown.description
                                        && <span>
                                            {doctorProfile.Markdown.description}
                                        </span>}
                                </>
                                :
                                <>
                                    {bookingTime && this.renderBookingTime(bookingTime, language)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='fee'>
                    <FormattedMessage
                        id="patient.booking-info.price-title">
                    </FormattedMessage>

                    {doctorProfile.Doctor_Infor ? //check Doctor_Infor
                        language === LANGUAGES.VI ? // check language
                            doctorProfile.Doctor_Infor.priceData ? //check Doctor_Infor.priceData
                                < NumberFormat
                                    className='currency'
                                    value={doctorProfile.Doctor_Infor.priceData.valueVi ? doctorProfile.Doctor_Infor.priceData.valueVi : ''}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix='đ'>
                                </NumberFormat> : ''
                            :
                            doctorProfile.Doctor_Infor.priceData ? //check Doctor_Infor.valueVi
                                < NumberFormat
                                    className='currency'
                                    value={doctorProfile.Doctor_Infor.priceData.valueEn ? doctorProfile.Doctor_Infor.priceData.valueEn : ''}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix='$'>
                                </NumberFormat> : ''
                        :
                        ''
                    }
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
