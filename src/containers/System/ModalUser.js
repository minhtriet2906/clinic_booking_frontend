import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.handleToggleModalUser();
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
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                valid = false;
                alert('Missing input ' + arrInput[i]);
                break;
            }
        }
        return valid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if (isValid) {
            //call api create modal
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => { this.toggle() }}>Create new User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email'
                                value={this.state.email}
                                onChange={(event) => { this.handleInput(event, 'email') }} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                value={this.state.password}
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
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
                        Save
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
