import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../containers/Header/Header';
import ScheduleManage from '../containers/System/Doctor/ScheduleManage';
import PatientManage from '../containers/System/Doctor/PatientManage';


class Doctor extends Component {

    render() {
        const { isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className='system-list'>
                    <Switch>
                        <Route path="/doctor/schedule-manage" component={ScheduleManage} />
                        <Route path="/doctor/patient-manage" component={PatientManage} />

                    </Switch>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
