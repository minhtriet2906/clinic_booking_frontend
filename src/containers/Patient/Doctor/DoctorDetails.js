import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetails.scss'
import { getDoctorDetailsService } from '../../../services/userService';
import DoctorSchedules from './DoctorSchedules';
import DoctorBookingInfo from './DoctorBookingInfo';

class DoctorDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: {},
            doctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let doctorId = this.props.match.params.id;
            this.setState({
                doctorId: doctorId
            })

            let res = await getDoctorDetailsService(doctorId);
            if (res && res.errorCode === 0) {
                this.setState({
                    doctorDetails: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        console.log(this.state);
        let { doctorDetails } = this.state;
        let { language } = this.props;

        let nameVi = '', nameEn = '';

        if (doctorDetails && doctorDetails.positionData) {
            nameVi = `${doctorDetails.positionData.valueVi} ${doctorDetails.lastName} ${doctorDetails.firstName}`;
            nameEn = `${doctorDetails.positionData.valueEn} ${doctorDetails.firstName} ${doctorDetails.lastName}`;
        }
        return (
            <div>
                <>
                    <HomeHeader isShowBanner={false}>

                    </HomeHeader>
                    <div className='doctor-details-container'>
                        <div className='doctor-intro'>
                            <div className='left-content'
                                style={{ backgroundImage: `url(${doctorDetails && doctorDetails.image ? doctorDetails.image : null})` }}
                            >
                            </div>
                            <div className='right-content'>
                                <div className='doctor-name'>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </div>
                                <div className='doctor-summary'>
                                    {doctorDetails && doctorDetails.Markdown && doctorDetails.Markdown.description
                                        && <span>
                                            {doctorDetails.Markdown.description}
                                        </span>}
                                </div>
                            </div>
                        </div>
                        <div className='doctor-schedule'>
                            <div className='left-content'>
                                <DoctorSchedules
                                    doctorIdFromDetails={this.state.doctorId}>
                                </DoctorSchedules>
                            </div>
                            <div className='right-content'>
                                <DoctorBookingInfo
                                    doctorIdFromDetails={this.state.doctorId}>
                                </DoctorBookingInfo>
                            </div>
                        </div>
                        <div className='doctor-info'>
                            {doctorDetails && doctorDetails.Markdown && doctorDetails.Markdown.contentHTML
                                && <div dangerouslySetInnerHTML={{ __html: doctorDetails.Markdown.contentHTML }}>
                                </div>
                            }
                        </div>
                        <div className='comment'></div>
                    </div>
                </>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctors: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetails);
