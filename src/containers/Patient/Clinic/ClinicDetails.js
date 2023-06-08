import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'; import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedules from '../Doctor/DoctorSchedules';
import DoctorBookingInfo from '../Doctor/DoctorBookingInfo';
import DoctorProfile from '../Doctor/DoctorProfile';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import './ClinicDetails.scss'

import { getClinicDetailsService } from '../../../services/userService';

class ClinicDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicDetails: {},
            clinicId: -1,
            clinicDoctors: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let clinicId = this.props.match.params.id;

            this.setState({
                clinicId: clinicId
            })

            let res = await getClinicDetailsService(clinicId);

            if (res && res.errorCode === 0) {
                console.log(res);
                this.setState({
                    clinicDetails: res.data,
                    clinicDoctors: res.data.Doctor_Infors
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        console.log(this.state.clinicDoctors);
        let { clinicDetails, clinicDoctors } = this.state;
        return (
            <div className='clinic-details-container'>
                <HomeHeader
                    isShowBanner={false}>
                </HomeHeader>
                <div className='clinic-details-body'>
                    <div className='clinic-content'>
                        <div className='clinic-title'>
                            {clinicDetails.name}
                        </div>
                        {clinicDetails.address}
                        {clinicDetails && clinicDetails.Markdown && clinicDetails.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: clinicDetails.Markdown.contentHTML }}>
                            </div>
                        }
                    </div >

                    <div className='doctor-list-title'>
                        Danh sach bac si
                    </div>
                    {clinicDoctors && clinicDoctors.length > 0 &&
                        clinicDoctors.map((item, index) => {
                            return (
                                <>
                                    <div className='doctor'>
                                        <div className='clinic-left-content'>
                                            <div className='doctor-profile'>
                                                <DoctorProfile
                                                    doctorId={item.doctorId}
                                                    isShowDoctorDescription={true}
                                                    isShowDoctorDetails={true}
                                                    isShowBookingPrice={false}
                                                    key={index}
                                                ></DoctorProfile>
                                            </div>
                                        </div>
                                        <div className='clinic-right-content'>
                                            <div className='schedule'>
                                                <DoctorSchedules
                                                    doctorIdFromDetails={item.doctorId}
                                                    key={index}>
                                                </DoctorSchedules>
                                            </div>
                                            <div className='booking-info'>
                                                <DoctorBookingInfo
                                                    doctorIdFromDetails={item.doctorId}
                                                    key={index}>
                                                </DoctorBookingInfo>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetails);
