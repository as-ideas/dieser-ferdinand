import React, { Component, PropTypes } from 'react';
import './HistoryModal.scss';

import WalletService from '../../services/WalletService';
import UtilsService from '../../services/UtilsService';
import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom'

export default class HistoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            message: null
        }
    }

    componentDidMount() {
        this.snycHistory();
    }

    sortHistory(history) {
        return history.sort(function (historyItemA, historyItemB) {
            var historyItemKeyA = historyItemA.assignmentDate.epochSecond,
                historyItemKeyB = historyItemB.assignmentDate.epochSecond;

            if (historyItemKeyA < historyItemKeyB) return 1;
            if (historyItemKeyA > historyItemKeyB) return -1;
            return 0;
        });
    }

    snycHistory() {
        return WalletService.getHistory().then(history => {
            this.setState({
                history: this.sortHistory(history)
            });
        }).catch(e => {
            this.setState({
                message: e.message
            });
        })
    }

    gotoArticle(id) {
        window.location.href = '/article/' + id
    }

    renderRow(historyItem) {
        let activity = historyItem.transactionType === 'PURCHASE' ?
            (
                <li className='historyModal__activity'>
                    {'Unlocked '}
                    <span onClick={this.gotoArticle.bind(this, historyItem.contentId)}>
                        {'article (ID: ' + historyItem.contentId + ')'}
                    </span>
                </li>
            )
            :
            (
                <li className='historyModal__activity'>
                    Charged money
                </li>
            );

        return (
            <ul key={historyItem.id} className='historyModal__row'>
                <li className='historyModal__date'>{UtilsService.formatDate(historyItem.assignmentDate.epochSecond * 1000)}</li>
                {activity}
                <li className='historyModal__amount'>{(historyItem.transactionType === 'TOP_UP' ? '+ ' : '- ') + UtilsService.formatBalance(historyItem.amount)}</li>
            </ul>
        )
    }

    renderTable() {
        let rows = [
            <ul className='historyModal__row historyModal__row--tableHead'>
                <li className='historyModal__date'>Date</li>
                <li className='historyModal__activity'>Activity</li>
                <li className='historyModal__amount'>Amount</li>
            </ul>
        ];

        this.state.history.forEach((item) => {
            rows.push(
                this.renderRow(item)
            );
        });

        return (
            <ul className='historyModal__table'>
                {rows}
            </ul>
        )
    }

    render() {
        let table;
        let heading;
        if (this.state.history) {
            table = this.renderTable();
            heading = <h1 className='historyModal__heading'>Your history</h1>
        }

        return (
            <Modal className='historyModal__container' onClose={this.props.onClose} message={this.state.message}>
                {heading}
                {table}
            </Modal>
        );
    }
}