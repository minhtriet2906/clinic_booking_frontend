import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ConfirmModal.scss'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { confirmAppointmentCompleteService } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay';


class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientEmail: '',
            patientFirstName: '',
            patientId: '',
            doctorId: '',
            timeType: '',
            time: '',
            date: '',
            attachment: null,
            comment: '',
            isLoading: false,

        }
    }

    async componentDidMount() {
        this.setState({
            patientEmail: this.props.patientDataModal.patientEmail,
            patientFirstName: this.props.patientDataModal.patientFirstName,
            patientId: this.props.patientDataModal.patientId,
            doctorId: this.props.patientDataModal.doctorId,
            timeType: this.props.patientDataModal.timeType,
            time: this.props.patientDataModal.time,
            date: this.props.patientDataModal.date,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.patientDataModal !== this.props.patientDataModal) {
            this.setState({
                patientEmail: this.props.patientDataModal.patientEmail,
                patientFirstName: this.props.patientDataModal.patientFirstName,
                patientId: this.props.patientDataModal.patientId,
                doctorId: this.props.patientDataModal.doctorId,
                timeType: this.props.patientDataModal.timeType,
                time: this.props.patientDataModal.time,
                date: this.props.patientDataModal.date,
            })
        }
    }

    handleConfirm = async () => {
        this.setState({
            isLoading: true
        })

        let res = await confirmAppointmentCompleteService({
            patientEmail: this.state.patientEmail,
            patientFirstName: this.state.patientFirstName,
            patientId: this.state.patientId,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            time: this.state.time,
            date: this.state.date,
            attachment: this.state.attachment,
            comment: this.state.comment,
            language: this.props.language
        })

        if (res && res.errorCode === 0) {
            toast.success('Appointment Completed!');
            this.setState({
                isLoading: false
            })
        }
        else {
            toast.error('Error!');
        }

        console.log(res);
    }

    handleCancelBooking = () => {
        console.log(this.state);
    }

    handleOnChangePatientEmail = (event) => {
        this.setState({
            patientEmail: event.target.value,
        })
    }

    handleOnChangeComment = (event) => {
        this.setState({
            comment: event.target.value,
        })
    }

    handleOnChangeAttachment = async (event) => {
        let data = event.target.files;
        console.log(data);
        let file = data[0];
        if (file) {
            this.setState({
                attachment: file,
            })
        }

    }


    render() {
        let { isOpenModal, closeConfirmModal, patientDataModal } = this.props;
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    className='confirm-modal-container'
                    size='md'
                    centered>
                    <ModalHeader toggle={closeConfirmModal}>Confirm</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Patient Email</label>
                                <input className='form-control' type='email' value={this.state.patientEmail}
                                    onChange={(event) => this.handleOnChangePatientEmail(event)}></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Select Attachment File</label>
                                <input type='file' onChange={(event) => this.handleOnChangeAttachment(event)}></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label>Doctor Comment</label>
                                <textarea className='form-control' type='text' value={this.state.co}
                                    onChange={(event) => this.handleOnChangeComment(event)}></textarea>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.handleConfirm}>Completed</Button>
                        <Button color='secondary' onClick={closeConfirmModal}>Cancel</Button>
                    </ModalFooter>

                    <LoadingOverlay
                        active={this.state.isLoading}
                        spinner
                        text='Sending Medical Result'>
                    </LoadingOverlay>
                </Modal >
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
