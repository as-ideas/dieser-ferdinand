import React, { Component, PropTypes } from 'react';
import './ContentItemArticle.scss';
import { Link } from 'react-router-dom'

import Overlay from '../Overlay/Overlay'

export default class ContentItemArticle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let overlay = this.props.purchaseRequired ? <Overlay onArticleUnlock={this.props.onArticleUnlock} content={this.props.contentObject} /> : null;

        return (
            <li className={'contentItemArticle__container ' + this.props.className}>
                <h3 className='contentItemArticle__heading'><Link to={'/article/' + this.props.contentObject.id}>{this.props.contentObject.title}</Link></h3>
                <p className='contentItemArticle__restriction'>Exclusive to ContentCoins users</p>
                <div className='contentItemArticle__content'>
                    <p className='contentItemArticle__articleContent' dangerouslySetInnerHTML={{ __html: this.props.contentObject.content }} />
                </div>
                {overlay}
            </li>
        );
    }
}