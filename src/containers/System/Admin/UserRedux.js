import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genders: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            console.log('check res ', res);
            if (res && res.errorCode === 0) {
                this.setState({
                    genders: res.data
                })
            }
            console.log(this.state.genders);
        } catch (error) {
            console.log(error);
        }
    }


    render() {

        let gendersList = this.state.genders
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' name='email' placeholder='Email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='text' name='password' placeholder='Password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' name='firstName' placeholder='First Name' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' name='lastName' placeholder='Last Name' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className='form-control' type='text' name='phonenumber' placeholder='Phone Number' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' name='address' placeholder='Address' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select name="gender" className="form-control">
                                    {gendersList && gendersList.length > 0 && gendersList.map((item, index) => {
                                        return (
                                            <option key={index}>{item.valueVi}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select name="position" className="form-control">
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select name="roleId" className="form-control">
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
