import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import { connect } from 'react-redux';
import './PatientManageTable.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from '../../../utils';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class PatientManageTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: []
        }
    }

    componentDidMount() {
        console.log(this.props.bookings);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSendReceipt = (user) => {
    }

    handleConfirm = (user) => {
        console.log("edit ", user);
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
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{language === LANGUAGES.VI ? item.timeTypeBookingData.valueVi : item.timeTypeBookingData.valueEn}</td>
                                    <td>{item.patientData.email}</td>
                                    <td>{item.patientData.firstName}</td>
                                    <td>{item.patientData.lastName}</td>
                                    <td>{item.patientData.genderData.valueVi}</td>
                                    <td>{item.patientData.address}</td>
                                    <td>{item.patientData.phonenumber}</td>

                                    <td>
                                        <button className='btn-confirm' onClick={() => this.handleConfirm(item)}>Confirm</button>
                                        <button className='btn-send-receipt' onClick={() => this.handleSendReceipt(item)}>Send Receipt</button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
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
