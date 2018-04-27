import React, { Component, PropTypes } from 'react';
import './LoginModal.scss';

import AuthService from '../../services/AuthService';
import Modal from '../Modal/Modal';

export default class TopUpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: null
        }
    }

    onUserChangeHandler(e) {
        this.setState({
            username: e.target.value
        });
    }
    onPwChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    login() {
        AuthService.login(this.state.username, this.state.password)
            .then(() => {
                this.props.onLoginSuccessful();
                this.setState({
                    message: null
                });
            })
            .catch((e) => {
                console.error(e);
                this.setState({
                    message: e.message
                })
            });
    }

    render() {
        return (
            <Modal className='loginModal__container' onClose={this.props.onClose} message={this.state.message}>
                <h3>Login:</h3>
                <input onChange={this.onUserChangeHandler.bind(this)} value={this.state.username} placeholder='Username' type='text' />
                <input onChange={this.onPwChangeHandler.bind(this)} value={this.state.password} placeholder='Password' type='password' />
                <button onClick={this.login.bind(this)}>Login!</button>
            </Modal>
        );
    }
}