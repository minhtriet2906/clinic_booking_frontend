import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialtiesService } from '../../../services/userService';
import * as actions from "../../../store/actions";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
        }
    }

    async componentDidMount() {
        this.props.getAllSpecialties();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.specialties !== this.props.specialties) {
            this.setState({
                specialties: this.props.specialties,
            })
        }
    }

    render() {
        let specialtiesList = this.state.specialties;

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <button><FormattedMessage id='homepage.more-info' /></button>
                        <span><div><FormattedMessage id='homepage.specialty'></FormattedMessage></div></span>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {specialtiesList && specialtiesList.length > 0 &&
                                specialtiesList.map((item, index) => {
                                    let imgBase64 = '';
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    console.log(imgBase64);
                                    return (
                                        <div className='section-customize'>
                                            <div className='outer-bg'>
                                                <div className='bg-image img-specialty'
                                                    style={{ backgroundImage: `url(${imgBase64})` }}
                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{item.name}</div>
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
        specialties: state.admin.specialties,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);