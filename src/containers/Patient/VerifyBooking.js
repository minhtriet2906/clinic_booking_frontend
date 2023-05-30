import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { verifyBookingAppointmentService } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import "./VerifyBooking.scss"
class VerifyBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verified: false,
            errorCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {

            console.log('props', this.props);
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');

            let res = await verifyBookingAppointmentService({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errorCode === 0) {
                this.setState({
                    verified: true,
                    errorCode: res.errorCode
                })
            }
            else {
                this.setState({
                    verified: true,
                    errorCode: res && res.errorCode ? res.errorCode : -1,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { verified, errorCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-booking-container'>
                    {verified === false ?
                        <div>
                            Verifying...
                        </div>
                        :
                        <div>
                            {errorCode === 0 ?
                                <div className='booking-info'>
                                    Successfully Verified
                                </div>
                                :
                                <div className='booking-info'>
                                    Appointment does not exist or has been verified
                                </div>}
                        </div>
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
