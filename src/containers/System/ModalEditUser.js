import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        // this.listenToEmitter();
    }

    // listenToEmitter() {
    //     emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
    //         this.setState({
    //             email: '',
    //             password: '',
    //             firstName: '',
    //             lastName: '',
    //             address: '',
    //         })
    //     })
    // }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

    toggle = () => {
        this.props.handleToggleModalEditUser();
    }

    handleInput = (event, id) => {
        //copy state
        let inputState = { ...this.state };
        inputState[id] = event.target.value;

        this.setState({
            ...inputState
        });
    }

    checkValidInput() {
        let valid = true;
        let arrInput = ['firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                valid = false;
                alert('Missing input ' + arrInput[i]);
                break;
            }
        }
        return valid;
    }

    handleEditUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            //call api edit user modal
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email'
                                value={this.state.email}
                                disabled
                                onChange={(event) => { this.handleInput(event, 'email') }} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                value={this.state.password}
                                disabled
                                onChange={(event) => { this.handleInput(event, 'password') }} />
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text'
                                value={this.state.firstName}
                                onChange={(event) => { this.handleInput(event, 'firstName') }} />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                value={this.state.lastName}
                                onChange={(event) => { this.handleInput(event, 'lastName') }} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text'
                                value={this.state.address}
                                onChange={(event) => { this.handleInput(event, 'address') }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleEditUser() }}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
