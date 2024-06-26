import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
        }
    }

    componentDidMount() {
        this.props.getTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors,
            })
        }
    }

    handleViewDoctorDetails = (doctor) => {
        console.log('doctor ', doctor);
        if (this.props.history) {
            this.props.history.push(`/doctor-details/${doctor.id}`)
        }
    }

    render() {
        let doctorsList = this.state.doctors;

        return (
            <div className="section-share section-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span><div><FormattedMessage id='homepage.top-doctor'></FormattedMessage></div></span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {doctorsList && doctorsList.length > 0 &&
                                doctorsList.map((item, index) => {
                                    let imgBase64 = '';
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn} ${item.lastName} ${item.firstName}`;
                                    let specialty = `${item.Doctor_Infor.specialtyData.name}`;

                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDoctorDetails(item)}>
                                            <div className='outer-bg'>
                                                <div className='bg-image img-doctor'
                                                    style={{ backgroundImage: `url(${imgBase64})` }}
                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{this.props.language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>{specialty}</div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
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
        getTopDoctors: () => dispatch(actions.fetchTopDoctorsStart()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
