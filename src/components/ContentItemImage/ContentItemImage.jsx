import React, { Component, PropTypes } from 'react';
import './ContentItemImage.scss';
import { Link } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';

export default class ContentItemImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let overlay = this.props.purchaseRequired ? <Overlay onArticleUnlock={this.props.onArticleUnlock} content={this.props.contentObject} /> : null;

        let img = this.props.contentObject.purchasedByUser ? (
            <div className='contentItemImage__content'>
                <img src={this.props.contentObject.contentUrl + '?' + Math.random() * 1000} alt={this.props.contentObject.description} />
            </div>
        ) : null;

        return (
            <li className={'contentItemImage__container ' + this.props.className}>
                <h3 className='contentItemImage__title'><Link to={'/article/' + this.props.contentObject.id}>{this.props.contentObject.title}</Link></h3>
                <p className='contentItemImage__restriction'>Exclusive to ContentCoins users</p>
                {img}
                {overlay}
                <p className='contentItemImage__description'>
                    {this.props.contentObject.description}
                </p>
            </li>
        );
    }
}