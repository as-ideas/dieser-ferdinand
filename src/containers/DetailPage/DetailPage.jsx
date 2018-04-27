import React, { Component, PropTypes } from 'react';
import './DetailPage.scss';
import ContentService from '../../services/ContentService';

import ContentItemImage from '../../components/ContentItemImage/ContentItemImage';
import ContentItemAudio from '../../components/ContentItemAudio/ContentItemAudio';
import ContentItemVideo from '../../components/ContentItemVideo/ContentItemVideo';
import ContentItemArticle from '../../components/ContentItemArticle/ContentItemArticle';
import CoinWidget from '../../components/CoinWidget/CoinWidget';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: {},
            message: null
        }
    }

    componentWillMount() {
        this.refreshContent();
    }

    refreshContent() {
        ContentService.getContentById(this.props.match.params.id).then((content) => {
            this.setState({
                content: content,
                message: null
            });
        }).catch((e) => {
            let message;
            if (e.status === 500) {
                message = 'Article with ID ' + this.props.match.params.id + ' not found';
            } else {
                message = 'Unknown error';
            }
            this.setState({
                message: message
            })
        });
    }

    onArticleUnlock(id) {
        this.refreshContent();
    }

    renderContent() {
        if (this.state.content) {
            let content = this.state.content;

            if (content.type === 'ARTICLE') {
                return <ContentItemArticle onArticleUnlock={this.onArticleUnlock.bind(this)} className='detailPage__listItem' contentObject={content} purchaseRequired={ContentService.isPurchaseRequired(content)} />;
            } else if (content.type === 'IMAGE') {
                return <ContentItemImage onArticleUnlock={this.onArticleUnlock.bind(this)} className='detailPage__listItem' contentObject={content} purchaseRequired={ContentService.isPurchaseRequired(content)} />;
            } else if (content.type === 'AUDIO') {
                return <ContentItemAudio onArticleUnlock={this.onArticleUnlock.bind(this)} className='detailPage__listItem' contentObject={content} purchaseRequired={ContentService.isPurchaseRequired(content)} />;
            } else if (content.type === 'VIDEO') {
                return <ContentItemVideo onArticleUnlock={this.onArticleUnlock.bind(this)} className='detailPage__listItem' contentObject={content} purchaseRequired={ContentService.isPurchaseRequired(content)} />;
            } else return null;
        } else {
            return null;
        }
    }

    render() {
        let message = <p className='detailPage__message'>{this.state.message}</p>

        return (
            <section className='detailPage__container centered'>
                {this.renderContent()}
                {message}
                <CoinWidget />
            </section >
        );
    }
}