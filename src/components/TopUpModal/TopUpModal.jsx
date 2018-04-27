import React, { Component, PropTypes } from 'react';
import './TopUpModal.scss';

import WalletService from '../../services/WalletService';
import UtilsService from '../../services/UtilsService';
import Modal from '../Modal/Modal';
import EventService from '../../services/EventService';

export default class TopUpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 500,
            message: null
        }
    }

    changeAmount(amount) {
        this.setState({
            amount: amount
        });
    }

    charge() {
        WalletService.topUp(this.state.amount)
            .then((data) => {
                EventService.emit('unlockedArticle');
                this.setState({
                    message: null
                });
                this.props.onChargeSuccessful(data);
            })
            .catch((e) => {
                this.setState({
                    message: 'Charge failed, please try again later'
                });
                this.props.onChargeFailed(e);
            });
    }

    render() {
        return (
            <Modal className='topUpModal__container' onClose={this.props.onClose} message={this.state.message}>
                <h1>Charge Content Coins</h1>
                <ul className='topUpModal__amountItemList'>
                    <li className={'topUpModal__amountItem' + (this.state.amount === 500 ? ' topUpModal__amountItem--active' : '')} onClick={this.changeAmount.bind(this, 500)}>5¢</li>
                    <li className={'topUpModal__amountItem' + (this.state.amount === 1000 ? ' topUpModal__amountItem--active' : '')} onClick={this.changeAmount.bind(this, 1000)}>10¢</li>
                    <li className={'topUpModal__amountItem' + (this.state.amount === 2000 ? ' topUpModal__amountItem--active' : '')} onClick={this.changeAmount.bind(this, 2000)}>20¢</li>
                </ul>
                <button className='topUpModal__chargeButton' onClick={this.charge.bind(this)}>Charge!</button>
                <p className='topUpModal__explanation'>1¢ equals 1€</p>
                <div className='topUpModal__paymentMethod'>
                    <p className='topUpModal__paymentText'>Payment Method:</p>
                    <img src='https://cdn.worldvectorlogo.com/logos/paypal.svg' alt='paypal' />
                </div>
            </Modal>
        );
    }
}