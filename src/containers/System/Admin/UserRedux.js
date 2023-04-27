import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            roles: [],
            positions: [],
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderState();
        this.props.getRoleState();
        this.props.getPositionState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.gender !== this.props.gender) {
            this.setState({
                genders: this.props.gender
            })
        }

        if (prevProps.role !== this.props.role) {
            this.setState({
                roles: this.props.role
            })
        }

        if (prevProps.position !== this.props.position) {
            this.setState({
                positions: this.props.position
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL
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

    render() {
        let gendersList = this.state.genders;
        let rolesList = this.state.roles;
        let positionsList = this.state.positions;
        let isLoading = this.state.isLoading;

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
                                            <option key={index}>
                                                {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select name="position" className="form-control">
                                    {positionsList && positionsList.length > 0 && positionsList.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select name="roleId" className="form-control">
                                    {rolesList && rolesList.length > 0 && rolesList.map((item, index) => {
                                        return (
                                            <option key={index}>
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
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
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
        gender: state.admin.genders,
        role: state.admin.roles,
        position: state.admin.positions,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderState: () => dispatch(actions.fetchGenderStart()),
        getRoleState: () => dispatch(actions.fetchRoleStart()),
        getPositionState: () => dispatch(actions.fetchPositionStart()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
