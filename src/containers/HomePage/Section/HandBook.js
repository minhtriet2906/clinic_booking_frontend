import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {


    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <button>XEM THÊM</button>
                        <span>Cẩm nang</span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Cẩm nang 1</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Cẩm nang 2</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Cẩm nang 3</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Cẩm nang 4</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Cẩm nang 5</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image img-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Cẩm nang 6</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);