import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;
        console.log("user ", this.props.userInfo);
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div><FormattedMessage id="homeheader.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div><FormattedMessage id="homeheader.select-facility" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.medical-bundle" /></b></div>
                                <div><FormattedMessage id="homeheader.fully-check" /></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'><FormattedMessage id="homeheader.support" /></i></div>
                            <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                                onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                                VN
                            </span>
                            <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                                onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                EN
                            </span>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title-1'><div><FormattedMessage id="banner.title-1" /></div></div>
                        <div className='title-2'><div><FormattedMessage id="banner.title-2" /></div></div>
                        <div className='search'>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder='Tìm kiếm' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className='far fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="medicaloptions.specialist" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                <div className='text-child'><FormattedMessage id="medicaloptions.remote" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-procedures'></i></div>
                                <div className='text-child'><FormattedMessage id="medicaloptions.general" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-flask"></i></div>
                                <div className='text-child'><FormattedMessage id="medicaloptions.medical-test" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                <div className='text-child'><FormattedMessage id="medicaloptions.mental-health" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className='fa-thin fa-tooth'></i></div>
                                <div className='text-child'><FormattedMessage id="medicaloptions.dental" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
