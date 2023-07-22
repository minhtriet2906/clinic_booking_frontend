import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { getDoctorSchedulesByDateService, deleteScheduleService } from '../../../services/userService';
import './ScheduleManageTable.scss';
import { toast } from 'react-toastify';


class ScheduleManageTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedules: []
        }
    }

    async componentDidMount() {
        if (this.props.doctor && this.props.formattedDate) {
            if (this.props.doctor) {
                let res = await getDoctorSchedulesByDateService(this.props.doctor.value, this.props.formattedDate);
                if (res && res.errorCode === 0) {
                    this.setState({
                        schedules: res.data ? res.data : []
                    })
                }
            }
            else {
                toast.error("Please select doctor");
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.doctor !== prevProps.doctor) ||
            (this.props.formattedDate !== prevProps.formattedDate)) {
            if (this.props.doctor) {
                let res = await getDoctorSchedulesByDateService(this.props.doctor.value, this.props.formattedDate);
                if (res && res.errorCode === 0) {
                    this.setState({
                        schedules: res.data ? res.data : []
                    })
                }
            }
            else {
                toast.error("Please select doctor");
            }
        }
    }

    handleDeleteSchedule = async (schedule) => {
        console.log(schedule);
        let res = await deleteScheduleService({
            doctorId: schedule.doctorId,
            timeType: schedule.timeType,
            date: schedule.date,
        });
        console.log(res);
        if (res && res.errorCode === 0) {
            toast.success(res.message);
            if (this.props.doctor) {
                let res = await getDoctorSchedulesByDateService(this.props.doctor.value, this.props.formattedDate);
                if (res && res.errorCode === 0) {
                    this.setState({
                        schedules: res.data ? res.data : []
                    })
                }
            }
            else {
                toast.error("Please select doctor");
            }
        }
        else {
            toast.error('Error!');
        }
    }

    render() {
        let doctorSchedules = this.state.schedules;
        let { language } = this.props;
        return (
            <React.Fragment>
                <table id='schedule-manage-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Doctor</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorSchedules && doctorSchedules.length > 0 && doctorSchedules.map((item, index) => {
                            let scheduleDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                            let doctorName = language === LANGUAGES.VI ?
                                item.doctorData.lastName + ' ' + item.doctorData.firstName :
                                item.doctorData.firstName + ' ' + item.doctorData.lastName;
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{doctorName}</td>
                                    <td>{scheduleDisplay}</td>
                                    <td>
                                        <button className='btn-delete' onClick={() => this.handleDeleteSchedule(item)}>Delete</button>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManageTable);
