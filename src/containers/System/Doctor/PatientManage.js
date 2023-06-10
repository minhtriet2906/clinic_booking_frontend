import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './PatientManage.scss'
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import { getPatientsListByDateService } from '../../../services/userService';
import PatientManageTable from './PatientManageTable';


class PatientManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(new Date()).startOf('day').valueOf(),
            bookingsList: [],
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { selectedDate } = this.state;
        console.log(user);
        console.log(selectedDate);

        let res = await getPatientsListByDateService(user.id, selectedDate);
        if (res && res.errorCode === 0) {
            this.setState({
                bookingsList: res.data
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSelectDatePicker = async (date) => {

        let formattedDate = new Date(date[0]).getTime();

        this.setState({
            selectedDate: formattedDate
        })

        let res = await getPatientsListByDateService(this.props.user.id, this.state.selectedDate);

        if (res && res.errorCode === 0) {
            this.setState({
                bookingsList: res.data
            })
        }
    }


    render() {
        let minDate = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='patient-manage-container'>
                <div className='patient-manage-title'>
                    Patient manage
                </div>
                <div className='patient-manage-body row'>

                    <div className="col-4 date-picker">
                        <label><label><FormattedMessage id='manage-schedule.choose-date'></FormattedMessage></label>
                        </label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleSelectDatePicker}
                            value={this.state.selectedDate}
                            minDate={minDate}
                        />
                    </div>

                    <div className='col-12 patient-manage-table'>
                        <div className='col-12 mt-3 mb-5'>
                            <PatientManageTable
                                bookings={this.state.bookingsList}
                            />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);
