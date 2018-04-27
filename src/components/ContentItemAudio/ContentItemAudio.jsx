import React, { Component, PropTypes } from 'react';
import './ContentItemAudio.scss';
import { Link } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';

export default class ContentItemAudio extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let overlay = this.props.purchaseRequired ? <Overlay onArticleUnlock={this.props.onArticleUnlock} content={this.props.contentObject} /> : null;

        let audio = this.props.contentObject.purchasedByUser ? (
            <div className='contentItemAudio__content'>
                <audio controls>
                    <source src={this.props.contentObject.contentUrl} type='audio/mp3' />
                    Your browser does not support the audio element.
                </audio>
            </div>) : null;

        return (
            <li className={'contentItemAudio__container ' + this.props.className}>
                <h3 className='contentItemAudio__title'><Link to={'/article/' + this.props.contentObject.id}>{this.props.contentObject.title}</Link></h3>
                <p className='contentItemAudio__restriction'>Exclusive to ContentCoins users</p>
                {audio}
                {overlay}
                <p className='contentItemAudio__description'>
                    {this.props.contentObject.description}
                </p>
            </li>
        );
    }
}