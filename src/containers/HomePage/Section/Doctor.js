import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Doctor extends Component {

    render() {
        return (
            <div className="section-share section-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <button>XEM THÊM</button>
                        <span>Bác sĩ nổi bật</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ XXX</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ XXX</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ XXX</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ XXX</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ XXX</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ XXX</div>
                                    <div>Cơ xương khớp</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
