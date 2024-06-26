import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
        }
    }

    async componentDidMount() {
        this.props.getAllClinics();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinics !== this.props.clinics) {
            this.setState({
                clinics: this.props.clinics,
            })
        }
    }

    handleViewClinicDetails = (clinic) => {
        console.log('clinic ', clinic);
        if (this.props.history) {
            this.props.history.push(`/clinic-details/${clinic.id}`)
        }
    }


    render() {
        let clinicsList = this.state.clinics;
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span><div><FormattedMessage id='homepage.clinic'></FormattedMessage></div></span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {clinicsList && clinicsList.length > 0 &&
                                clinicsList.map((item, index) => {
                                    let imgBase64 = '';
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewClinicDetails(item)}>
                                            <div className='outer-bg'>
                                                <div className='bg-image img-medical-facility'
                                                    style={{ backgroundImage: `url(${imgBase64})` }}
                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{item.name}</div>
                                            </div>
                                        </div>
                                    )
                                })}

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
        clinics: state.admin.clinics,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinics: () => dispatch(actions.fetchAllClinics()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
