import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import DoctorProfile from '../DoctorProfile';
import { times } from 'lodash';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { isOpenBookingModal, closeBookingModal, bookingTime } = this.props;
        console.log('time', bookingTime);
        return (
            <Modal isOpen={isOpenBookingModal}
                className='booking-modal-container'
                size='lg'
                centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Booking Info</span>
                        <span className='right'
                            onClick={closeBookingModal}>
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-info'>
                            <DoctorProfile
                                doctorId={this.props.doctorId}
                                isShowDoctorDescription={false}
                                bookingTime={bookingTime}>
                            </DoctorProfile>
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Name</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Phone Number</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Address</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Reason</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Book For</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Gender</label>
                                <input className='form-control'></input>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={closeBookingModal}>
                            Confirm
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
