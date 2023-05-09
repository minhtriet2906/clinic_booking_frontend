import React, { Component } from "react";
import { connect } from "react-redux";
import './ScheduleManage.scss'
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions"
import Select from 'react-select';
import DatePicker from "../../../components/Input/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class ScheduleManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorOptions: [],
            timeSlotOptions: [],
            selectedDoctor: null,
            selectedDate: null,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let optionsList = this.createDoctorsListOptions(this.props.doctors);
            this.setState({
                doctorOptions: optionsList,
            })
        }

        if (prevProps.language !== this.props.language) {
            let optionsList = this.createDoctorsListOptions(this.props.doctors);
            this.setState({
                doctorOptions: optionsList,
            })
        }

        if (prevProps.timeSlots !== this.props.timeSlots) {
            this.setState({
                timeSlotOptions: this.props.timeSlots,
            })
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getScheduleTimeSlots();
    }

    createDoctorsListOptions = (data) => {
        let doctorOptions = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item, index) => {
                let option = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                option.label = language === LANGUAGES.VI ? labelVi : labelEn;
                option.value = item.id;

                doctorOptions.push(option);
            })
        }
        return doctorOptions;
    }

    handleSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
        console.log(selectedDoctor);
    }

    handleSelectDatePicker = async (date) => {
        this.setState({
            selectedDate: date[0]
        })
    }

    render() {
        console.log('time slots ', this.state.timeSlotOptions);
        let { timeSlotOptions } = this.state;
        return (
            <div className="schedule-manage-container">
                <div className="schedule-manage-title">
                    <FormattedMessage id='manage-schedule.title'></FormattedMessage>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 choose-doctor">
                            <label><FormattedMessage id='manage-schedule.choose-doctor'></FormattedMessage></label>
                            <Select
                                onChange={this.handleSelectDoctor}
                                options={this.state.doctorOptions}
                                value={this.state.selectedDoctor}
                            />
                        </div>
                        <div className="col-4 date-picker">
                            <label><label><FormattedMessage id='manage-schedule.choose-date'></FormattedMessage></label>
                            </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleSelectDatePicker}
                                value={this.state.selectedDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 schedule-time-container">
                            {timeSlotOptions && timeSlotOptions.length > 0 &&
                                timeSlotOptions.map((item, index) => {
                                    return (
                                        <button className="btn btn-schedule" key={index}>
                                            {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                            <div className="col-12">
                                <button className="btn btn-primary btn btn-save-schedule"><FormattedMessage id='manage-schedule.save'></FormattedMessage></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctors: state.admin.doctors,
        timeSlots: state.admin.timeSlots
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
        getScheduleTimeSlots: () => dispatch(actions.fetchScheduleTime())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);