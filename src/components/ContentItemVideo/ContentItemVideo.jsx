import React, { Component, PropTypes } from 'react';
import './ContentItemVideo.scss';
import { Link } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';

export default class ContentItemAudio extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let overlay = this.props.purchaseRequired ? <Overlay onArticleUnlock={this.props.onArticleUnlock} content={this.props.contentObject} /> : null;

        let audio = this.props.contentObject.purchasedByUser ? (
            <div className='contentItemVideo__content'>
                <video width="320" height="240" controls>
                    <source src={this.props.contentObject.contentUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>) : null;

        return (
            <li className={'contentItemVideo__container ' + this.props.className}>
                <h3 className='contentItemVideo__title'><Link to={'/article/' + this.props.contentObject.id}>{this.props.contentObject.title}</Link></h3>
                <p className='contentItemVideo__restriction'>Exclusive to ContentCoins users</p>
                {audio}
                {overlay}
                <p className='contentItemVideo__description'>
                    {this.props.contentObject.description}
                </p>
            </li>
        );
    }
}