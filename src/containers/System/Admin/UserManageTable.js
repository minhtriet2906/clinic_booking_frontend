import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import { connect } from 'react-redux';
import './UserManageTable.scss'

class UserManageTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.getAllUsers();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users,
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }

    render() {
        let arrUsers = this.state.users;
        return (
            <table id='user-manage-table'>
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
                    {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'>Edit</button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageTable);
