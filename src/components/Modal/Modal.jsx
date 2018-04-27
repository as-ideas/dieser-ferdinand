import React, { Component, PropTypes } from 'react';
import './Modal.scss';

export default class Modal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let body = document.querySelector('body');
        body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        let body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    onClose() {
        this.props.onClose();
    }

    render() {
        let message;
        if (this.props.message) message = <p className='modal__message'>{this.props.message}</p>

        return (
            <div className='modal__container'>
                <div className={'modal__content ' + (this.props.className ? this.props.className : '')}>
                    {this.props.children}
                </div>
                <button className='modal__closeButton' onClick={this.onClose.bind(this)}>×</button>
                {message}
            </div>
        );
    }
}
