import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedules.scss'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { getDoctorSchedulesByDateService } from '../../../services/userService';

import { LANGUAGES } from '../../../utils';

class DoctorSchedules extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            schedules: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        console.log('vi ', moment(new Date()).format('dddd - DD/MM'));
        console.log('en ', moment(new Date()).locale('en').format('ddd - DD/MM'));

        this.setWeekDays(language);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setWeekDays(this.props.language);
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setWeekDays = async (language) => {
        let weekDays = [];
        for (let i = 0; i < 7; i++) {
            let day = {}
            if (language === LANGUAGES.VI) {
                day.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                day.label = this.capitalizeFirstLetter(day.label);
            }
            else {
                day.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');

            }
            day.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            weekDays.push(day);
        }

        this.setState({
            days: weekDays,
        })
    }

    handleSelectDate = async (event) => {
        if (this.props.doctorIdFromDetails && this.props.doctorIdFromDetails !== -1) {
            let doctorId = this.props.doctorIdFromDetails;
            let formattedDate = event.target.value;
            console.log(formattedDate);
            let date = new Date(parseInt(formattedDate));
            console.log(date);
            let res = await getDoctorSchedulesByDateService(doctorId, formattedDate);
            console.log('res ', res);

            if (res && res.errorCode === 0) {
                this.setState({
                    schedules: res.data
                })
            }
        }
    }

    render() {
        let { days, schedules } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-schedules-container'>
                <div className='all-schedules'>
                    <select onChange={(event) => this.handleSelectDate(event)}>
                        {days && days.length > 0 &&
                            days.map((item, index) => {
                                return (
                                    <option value={item.value}
                                        key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <div className='available-time'>
                    <div className='text-schedule'>
                        <span><i className='fas fa-calendar-alt'>Lịch khám</i></span>
                    </div>
                    <div className='schedule-content'>
                        {schedules && schedules.length > 0 ?
                            schedules.map((item, index) => {
                                let scheduleDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={index}>{scheduleDisplay}</button>
                                )
                            })
                            :
                            <div>Khong co lich hen trong hom nay</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctors: state.admin.doctors,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedules);
