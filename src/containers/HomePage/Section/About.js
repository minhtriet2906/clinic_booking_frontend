import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {


    render() {
        return (
            <div className="section-share section-about">
                <div className='content-left'>
                    <iframe src='https://www.youtube.com/watch?v=px9clychQJ4'
                        title='Youtube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media'
                        allowFullScreen>
                    </iframe>
                </div>
                <div className='content-right'>
                    About
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

export default connect(mapStateToProps, mapDispatchToProps)(About);