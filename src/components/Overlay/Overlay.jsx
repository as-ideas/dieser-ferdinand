import React, { Component, PropTypes } from 'react';
import './Overlay.scss';

import UtilsService from '../../services/UtilsService';
import PurchaseService from '../../services/PurchaseService';
import EventService from '../../services/EventService';

export default class Overlay extends Component {
    constructor(props) {
        super(props);
    }

    unlock() {
        PurchaseService.unlockArticle(this.props.content.id).then(() => {
            EventService.emit('unlockedArticle');
            this.props.onArticleUnlock(this.props.content.id)
        }).catch((e) => {
            console.log(e.status, e.message);

            if (e.status === 401 && e.message === 'Full authentication is required to access this resource') {
                EventService.emit('notAuthorized');
                console.log('notAuthorized');
            } else if (e.status === 400 && e.message === 'Purchase not possible, due to account balance exceeded!') {
                EventService.emit('balanceExceeded');
                console.log('balanceExceeded');
            }

            console.error('ERROR', e);
        });
    }

    render() {
        let title = 'content';
        if (this.props.content.type === 'ARTICLE') title = 'article';
        if (this.props.content.type === 'IMAGE') title = 'image';
        if (this.props.content.type === 'AUDIO') title = 'audio';
        if (this.props.content.type === 'VIDEO') title = 'video';

        return (
            <div className='overlay__container'>
                <p className='overlay__text' >
                    {'Unlock ' + title + ' for ' + UtilsService.formatBalance(this.props.content.price)}
                </p>
                <button onClick={this.unlock.bind(this)} className='overlay__unlockButton'>Unlock!</button>
            </div>
        );
    }
}
