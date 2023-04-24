import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <button>XEM THÊM</button>
                        <span>Cơ sở y tế nổi bật</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-medical-facility' />
                                </div>
                                <div className='position text-center'>
                                    <div>Bệnh viện đa khoa 1</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-medical-facility' />
                                </div>
                                <div className='position text-center'>
                                    <div>Bệnh viện đa khoa 2</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-medical-facility' />
                                </div>
                                <div className='position text-center'>
                                    <div>Bệnh viện đa khoa 3</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-medical-facility' />
                                </div>
                                <div className='position text-center'>
                                    <div>Bệnh viện đa khoa 4</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-medical-facility' />
                                </div>
                                <div className='position text-center'>
                                    <div>Bệnh viện đa khoa 5</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-medical-facility' />
                                </div>
                                <div className='position text-center'>
                                    <div>Bệnh viện đa khoa 6</div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
