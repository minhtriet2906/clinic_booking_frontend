import React, { Component } from "react";
import { connect } from "react-redux";
import './ScheduleManage.scss'
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions"
import Select from 'react-select';
import DatePicker from "../../../components/Input/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";

import { saveBulkScheduleService } from "../../../services/userService";
import ScheduleManageTable from "./ScheduleManageTable";

class ScheduleManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorOptions: [],
            timeSlotOptions: [],
            selectedDoctor: props.user.role === 'R2' ? props.user.id : null,
            selectedDate: null,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            if (this.props.user.role === 'R2') {
                this.setState({
                    selectedDoctor: {
                        value: this.props.user.id,
                        label: this.props.user.lastName + ' ' + this.props.user.firstName
                    },
                })
            }
        }

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
            let data = this.props.timeSlots;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                timeSlotOptions: data
            })
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getScheduleTimeSlots();

        if (this.props.user && this.props.user.role === 'R2') {
            this.setState({
                selectedDoctor: {
                    value: this.props.user.id,
                    label: this.props.user.lastName + ' ' + this.props.user.firstName
                },
            })
        }
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
    }

    handleSelectDatePicker = async (date) => {
        this.setState({
            selectedDate: date[0]
        })
    }

    handleSelectTimeSlot = (timeSlot) => {
        let { timeSlotOptions } = this.state;

        if (timeSlotOptions && timeSlotOptions.length > 0) {
            timeSlotOptions = timeSlotOptions.map(item => {
                if (item.id === timeSlot.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })

            this.setState({
                timeSlotOptions: timeSlotOptions
            })
        }
    }

    handleSaveSchedule = async () => {
        let { timeSlotOptions, selectedDoctor, selectedDate } = this.state;
        console.log(selectedDoctor);
        let schedules = []

        if (!selectedDate) {
            toast.error('Invalid date');
            return;
        }

        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid doctor');
            return;
        }

        let formattedDate = new Date(selectedDate).getTime();
        console.log(formattedDate);

        if (timeSlotOptions && timeSlotOptions.length > 0) {
            let selectedTimeSlots = timeSlotOptions.filter(item => item.isSelected === true);
            if (selectedTimeSlots && selectedTimeSlots.length > 0) {
                selectedTimeSlots.map(time => {
                    let doctorSchedule = {}
                    doctorSchedule.doctorId = selectedDoctor.value;
                    doctorSchedule.date = formattedDate;
                    doctorSchedule.timeType = time.keyMap;
                    schedules.push(doctorSchedule);
                })
            }
            else {
                toast.error('Empty schedules');
                return;
            }
        }

        let res = await saveBulkScheduleService({
            schedulesArr: schedules,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        });

        if (res && res.errorCode === 0) {
            console.log('saved');
            toast.success("Doctor's schedules created");
        }
        else {
            toast.error('Error!');
            console.log(res);
        }

    }

    render() {
        let { timeSlotOptions } = this.state;
        let doctorName = this.props.user.role === 'R2' ? this.props.user.lastName + ' ' + this.props.user.firstName : null;
        return (
            <div className="schedule-manage-container">
                <div className="schedule-manage-title">
                    <FormattedMessage id='manage-schedule.title'></FormattedMessage>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4 choose-doctor">
                            <label><FormattedMessage id='manage-schedule.choose-doctor'></FormattedMessage></label>
                            {(this.props.user && this.props.user.role === 'R2') ?
                                <input className='form-control'
                                    defaultValue={doctorName}
                                    disabled
                                ></input>
                                :
                                <Select
                                    onChange={this.handleSelectDoctor}
                                    options={this.state.doctorOptions}
                                    value={this.state.selectedDoctor}
                                />
                            }

                        </div>
                        <div className="col-4 date-picker">
                            <label><label><FormattedMessage id='manage-schedule.choose-date'></FormattedMessage></label>
                            </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleSelectDatePicker}
                                value={this.state.selectedDate}
                            />
                        </div>
                        <div className="col-12 schedule-time-container">
                            {timeSlotOptions && timeSlotOptions.length > 0 &&
                                timeSlotOptions.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleSelectTimeSlot(item)}>
                                            {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                            <div className="col-12">
                                <button className="btn btn-primary btn btn-save-schedule"
                                    onClick={() => this.handleSaveSchedule()}>
                                    <FormattedMessage id='manage-schedule.save' />
                                </button>
                            </div>

                            <div className='col-12 mt-3 mb-5'>
                                <ScheduleManageTable
                                    doctor={this.state.selectedDoctor}
                                    formattedDate={new Date(this.state.selectedDate).getTime()}
                                />
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
        timeSlots: state.admin.timeSlots,
        user: state.user.userInfo

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctorsStart()),
        getScheduleTimeSlots: () => dispatch(actions.fetchScheduleTime())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);