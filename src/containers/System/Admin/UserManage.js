import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import './UserManage.scss'
import UserManageTable from './UserManageTable';

class UserManage extends Component {

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

            editUserId: '',

            action: null,
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
                gender: gendersArr && gendersArr.length > 0 ? gendersArr[0].keyMap : ''
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let rolesArr = this.props.roles;
            this.setState({
                roles: rolesArr,
                role: rolesArr && rolesArr.length > 0 ? rolesArr[0].keyMap : ''

            })
        }

        if (prevProps.positions !== this.props.positions) {
            let positionsArr = this.props.positions;
            this.setState({
                positions: positionsArr,
                position: positionsArr && positionsArr.length > 0 ? positionsArr[0].keyMap : ''

            })
        }

        if (prevProps.users !== this.props.users) {
            let gendersArr = this.props.genders;
            let rolesArr = this.props.roles;
            let positionsArr = this.props.positions;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: gendersArr && gendersArr.length > 0 ? gendersArr[0].keyMap : '',
                position: positionsArr && positionsArr.length > 0 ? positionsArr[0].keyMap : '',
                role: rolesArr && rolesArr.length > 0 ? rolesArr[0].keyMap : '',
                image: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                image: base64,
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
                toast.error('Missing input ' + checkInfo[i]);
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

    handleEditUserManage = (user) => {
        let imgBase64 = '';
        if (user.image) {
            imgBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            editUserId: user.id,
            email: user.email,
            password: 'password',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.position,
            role: user.role,
            image: user.image,
            previewImgURL: imgBase64,
            action: CRUD_ACTIONS.EDIT,
        })



    }

    handleSaveUser = () => {
        console.log('save user ', this.state);

        if (!this.validateInput()) {
            return;
        }

        if (this.state.action === CRUD_ACTIONS.CREATE) {
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

        if (this.state.action === CRUD_ACTIONS.EDIT) {
            // fire redux 
            this.props.editUser({
                id: this.state.editUserId,
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

    }

    handleCancel = () => {
        this.setState({
            ...this.state,
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
            previewImgURL: '',
            editUserId: '',
            action: CRUD_ACTIONS.CREATE
        })
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
            <div className='user-manage-container'>
                <div className='title'>
                    <FormattedMessage id='menu.admin.manage-user'></FormattedMessage>
                </div>

                <div className="user-manage-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>{isLoading === true ? 'LOADING' : ''}</div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' name='email' placeholder='Email'
                                    value={email} onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT} />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' name='password' placeholder='Password'
                                    value={password} onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT} />
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
                                            <option key={index} value={item.keyMap}>
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
                                            <option key={index} value={item.keyMap}>
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
                                            <option key={index} value={item.keyMap}>
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
                            <div className='col-3 mt-3'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>

                            <div className='col-2 mt-3'>
                                <button
                                    className='btn btn-warning'
                                    onClick={() => this.handleCancel()}>
                                    <FormattedMessage id="manage-user.cancel" />
                                </button>
                            </div>

                            <div className='col-12 mt-3 mb-5'>
                                <UserManageTable
                                    handleEditUserManage={this.handleEditUserManage}
                                    action={this.state.action}
                                />
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
        editUser: (data) => dispatch(actions.editUser(data)),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
