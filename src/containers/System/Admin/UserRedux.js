import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss'
import UserManageTable from './UserManageTable';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            roles: [],
            positions: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            image: '',

        }
    }

    async componentDidMount() {
        this.props.getGenderState();
        this.props.getRoleState();
        this.props.getPositionState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.genders !== this.props.genders) {
            let gendersArr = this.props.genders;
            this.setState({
                genders: gendersArr,
                gender: gendersArr && gendersArr.length > 0 ? gendersArr[0].key : ''
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let rolesArr = this.props.roles;
            this.setState({
                roles: rolesArr,
                role: rolesArr && rolesArr.length > 0 ? rolesArr[0].key : ''

            })
        }

        if (prevProps.positions !== this.props.positions) {
            let positionsArr = this.props.positions;
            this.setState({
                positions: positionsArr,
                position: positionsArr && positionsArr.length > 0 ? positionsArr[0].key : ''

            })
        }

        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                image: '',
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                image: file
            })
        }

    }

    openPreviewImage = (event) => {
        if (!this.state.previewImgURL) {
            return;
        }

        this.setState({
            isOpen: true
        })
    }


    validateInput = () => {
        let checkInfo = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        let isValid = true;

        //missing input
        for (let i = 0; i < checkInfo.length; i++) {
            if (!this.state[checkInfo[i]]) {
                isValid = false;
                alert('Missing input ' + checkInfo[i]);
                break;
            }
        }

        return isValid;
    }

    onChangeInput = (event, inputType) => {
        let copyState = { ...this.state };

        copyState[inputType] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    handleSaveUser = () => {
        console.log(this.state);
        this.validateInput();

        // fire redux 
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phonenumber: this.state.phonenumber,
            address: this.state.address,
            gender: this.state.gender,
            position: this.state.position,
            role: this.state.role,
            image: this.state.image,
        });

    }
    render() {
        let gendersList = this.state.genders;
        let rolesList = this.state.roles;
        let positionsList = this.state.positions;
        let isLoading = this.state.isLoading;

        let { email, password, firstName, lastName, phonenumber,
            address, gender, position, role, image,
        } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>

                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>{isLoading === true ? 'LOADING' : ''}</div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' name='email' placeholder='Email'
                                    value={email} onChange={(event) => { this.onChangeInput(event, 'email') }} />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' name='password' placeholder='Password'
                                    value={password} onChange={(event) => { this.onChangeInput(event, 'password') }} />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' name='firstName' placeholder='First Name'
                                    value={firstName} onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' name='lastName' placeholder='Last Name'
                                    value={lastName} onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>

                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className='form-control' type='text' name='phonenumber' placeholder='Phone Number'
                                    value={phonenumber} onChange={(event) => { this.onChangeInput(event, 'phonenumber') }} />
                            </div>

                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' name='address' placeholder='Address'
                                    value={address} onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select name="gender" className="form-control"
                                    value={gender} onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                    {gendersList && gendersList.length > 0 && gendersList.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select name="position" className="form-control"
                                    value={position} onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                    {positionsList && positionsList.length > 0 && positionsList.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select name="role" className="form-control"
                                    value={role} onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                    {rolesList && rolesList.length > 0 && rolesList.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='preview-img' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                    <label className='label-upload' htmlFor='preview-img'>Tai anh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary' onClick={() => this.handleSaveUser()}><FormattedMessage id="manage-user.save" /></button>
                            </div>

                            <div className='col-12 mt-3 mb-5'>
                                <UserManageTable />
                            </div>
                        </div>
                    </div>
                </div>


                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        isLoading: state.admin.isLoading,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderState: () => dispatch(actions.fetchGenderStart()),
        getRoleState: () => dispatch(actions.fetchRoleStart()),
        getPositionState: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
