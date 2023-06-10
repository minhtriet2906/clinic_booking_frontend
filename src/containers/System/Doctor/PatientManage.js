import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './PatientManage.scss'
import DatePicker from "../../../components/Input/DatePicker";

class PatientManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSelectDatePicker = async (date) => {
        this.setState({
            selectedDate: date[0]
        })
    }


    render() {
        let minDate = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log(this.state.selectedDate);
        let formattedDate = new Date(this.state.selectedDate).getTime();
        console.log(formattedDate);

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
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);
