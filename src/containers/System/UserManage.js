import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    //set State
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errorCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    handleCreateNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    handleToggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    handleToggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errorCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    }

    editUser = async (data) => {
        try {
            let response = await editUserService(data);
            if (response && response.errorCode !== 0) {
                alert(response.message);
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errorCode === 0) {
                await this.getAllUsersFromReact();
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        console.log("users: ", arrUsers);
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    handleToggleModalUser={this.handleToggleModalUser}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        handleToggleModalEditUser={this.handleToggleModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <div className='title text-center'>Users Manager</div>
                <div className='mx-1'>
                    <button className='btn -btn-primary px-3'
                        onClick={() => this.handleCreateNewUser()}>
                        <i className='fas fa-plus'></i> Create new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-3'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}>Edit</button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
