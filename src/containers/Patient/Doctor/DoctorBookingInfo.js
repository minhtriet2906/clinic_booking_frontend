import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorBookingInfo.scss'
import { getDoctorBookingInfoService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorBookingInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowBookingDetailInfo: false,
            doctorBookingInfo: {},
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

        if (this.props.doctorIdFromDetails !== prevProps.doctorIdFromDetails) {
            let res = await getDoctorBookingInfoService(this.props.doctorIdFromDetails);
            if (res && res.errorCode === 0) {
                this.setState({
                    doctorBookingInfo: res.data ? res.data : {}
                })
            }
        }
    }

    showHideBookingDetail = (status) => {
        this.setState({
            isShowBookingDetailInfo: status
        })
    }

    render() {
        let { language } = this.props;
        let { isShowBookingDetailInfo, doctorBookingInfo } = this.state;
        let clinicName = doctorBookingInfo.clinicData ? doctorBookingInfo.clinicData.name : '';
        let clinicAddress = doctorBookingInfo.clinicData ? doctorBookingInfo.clinicData.address : '';

        return (
            <div className='doctor-booking-info-container'>
                <div className='clinic-info'>
                    <div className='address-text'><FormattedMessage id="patient.booking-info.address-title"></FormattedMessage></div>
                    <div className='clinic-name'>{clinicName}</div>
                    <div className='clinic-address'>{clinicAddress}</div>
                </div>
                <div className='booking-info'>
                    {isShowBookingDetailInfo === false &&
                        <div className='short-info'>
                            <FormattedMessage id="patient.booking-info.price-title"></FormattedMessage>
                            {doctorBookingInfo && doctorBookingInfo.priceData &&
                                < NumberFormat
                                    className='currency'
                                    value={doctorBookingInfo.priceData.valueVi ? doctorBookingInfo.priceData.valueVi : ''}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix='đ'>
                                </NumberFormat>
                            }


                            <span className='btn-detail' onClick={() => this.showHideBookingDetail(true)}>
                                <FormattedMessage id="patient.booking-info.show-detail-button"></FormattedMessage>
                            </span>
                        </div>
                    }
                    {isShowBookingDetailInfo === true &&
                        <>
                            <div className='price-title'><FormattedMessage id="patient.booking-info.price-title"></FormattedMessage> </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id="patient.booking-info.price"></FormattedMessage> </span>
                                    <span className='right'>
                                        {doctorBookingInfo && doctorBookingInfo.priceData &&
                                            < NumberFormat
                                                className='currency'
                                                value={doctorBookingInfo.priceData.valueVi ? doctorBookingInfo.priceData.valueVi : ''}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix='đ'>
                                            </NumberFormat>
                                        }
                                    </span>
                                    <div className='note'>
                                        {doctorBookingInfo && doctorBookingInfo.note && doctorBookingInfo.note}.
                                        The price of medical appointment for foreigners is:
                                        {doctorBookingInfo && doctorBookingInfo.priceData &&
                                            < NumberFormat
                                                className='currency'
                                                value={doctorBookingInfo.priceData.valueEn ? doctorBookingInfo.priceData.valueEn : ''}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix='$'>
                                            </NumberFormat>
                                        }
                                    </div>
                                    <div className='payment'>
                                        <FormattedMessage id="patient.booking-info.payment-method"></FormattedMessage>
                                        {doctorBookingInfo.paymentData ? //check paymentData
                                            language === LANGUAGES.VI ? // check language
                                                doctorBookingInfo.paymentData.valueVi ? //check paymentData.valueVi
                                                    doctorBookingInfo.paymentData.valueVi : ''
                                                :
                                                doctorBookingInfo.paymentData.valueEn ? //check paymentData.valueVi
                                                    doctorBookingInfo.paymentData.valueEn : ''
                                            :
                                            ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='hide-detail'>
                                <span onClick={() => this.showHideBookingDetail(false)}>
                                    <FormattedMessage id="patient.booking-info.hide-detail-button"></FormattedMessage>
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctors: state.admin.doctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorBookingInfo);
