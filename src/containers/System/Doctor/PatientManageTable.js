import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import { connect } from 'react-redux';
import './PatientManageTable.scss';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from '../../../utils';
import ConfirmModal from './ConfirmModal';
import { cancelAppointmentService } from '../../../services/userService';
import { toast } from 'react-toastify';

class PatientManageTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            isOpenConfirmModal: false,
            patientDataModal: {},
        }
    }

    componentDidMount() {
        console.log(this.props.bookings);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleConfirm = (booking) => {
        console.log("edit ", booking);
        // alert('click')

        let bookingData = {
            doctorId: booking.doctorId,
            patientId: booking.patientId,
            patientEmail: booking.patientData.email,
            patientFirstName: booking.patientData.firstName,
            timeType: booking.timeType,
            time: booking.timeTypeBookingData.valueEn,
            date: booking.date
        }

        this.setState({
            isOpenConfirmModal: true,
            patientDataModal: bookingData
        })

        console.log(bookingData);
    }

    handleCancel = async (booking) => {
        this.setState({
            isOpenConfirmModal: false
        })

        let bookingData = {
            doctorId: booking.doctorId,
            patientId: booking.patientId,
            patientEmail: booking.patientData.email,
            patientFirstName: booking.patientData.firstName,
            timeType: booking.timeType,
            time: booking.timeTypeBookingData.valueEn,
            date: booking.date
        }

        let res = await cancelAppointmentService(bookingData);
        if (res && res.errorCode === 0) {
            toast.success('Appointment Cancelled!');
            this.setState({
                isLoading: false
            })
        }
        else {
            toast.error('Error!');
        }

        console.log(res);
    }

    render() {
        let arrBookings = this.props.bookings;
        let { language } = this.props;
        return (
            <React.Fragment>
                <table id='patient-manage-table'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Time</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrBookings && arrBookings.length > 0 && arrBookings.map((item, index) => {
                            let timeType = language === LANGUAGES.VI ? item.timeTypeBookingData.valueVi : item.timeTypeBookingData.valueEn
                            let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{timeType}</td>
                                    <td>{item.patientData.email}</td>
                                    <td>{item.patientData.firstName}</td>
                                    <td>{item.patientData.lastName}</td>
                                    <td>{gender}</td>
                                    <td>{item.patientData.address}</td>
                                    <td>{item.patientData.phonenumber}</td>

                                    <td>
                                        <button className='btn-confirm' onClick={() => this.handleConfirm(item)}>Confirm</button>
                                        <button className='btn-cancel' onClick={() => this.handleCancel(item)}>Cancel</button>

                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>

                {this.state.isOpenConfirmModal ?
                    <ConfirmModal
                        isOpenModal={this.state.isOpenConfirmModal}
                        patientDataModal={this.state.patientDataModal}
                        closeConfirmModal={this.handleCancel}
                    />
                    :
                    ''
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManageTable);
