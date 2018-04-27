import React, { Component, PropTypes } from 'react';
import './ContentOverview.scss';
import ContentService from '../../services/ContentService';

import ContentItemImage from '../../components/ContentItemImage/ContentItemImage';
import ContentItemAudio from '../../components/ContentItemAudio/ContentItemAudio';
import ContentItemVideo from '../../components/ContentItemVideo/ContentItemVideo';
import ContentItemArticle from '../../components/ContentItemArticle/ContentItemArticle';
import CoinWidget from '../../components/CoinWidget/CoinWidget';

export default class ContentOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
    }

    componentWillMount() {
       this.refreshContent();
    }

    refreshContent(){
        ContentService.getContent().then((content) => {
            this.setState({ content: content });
        });
    }

    onArticleUnlock(id) {
        this.refreshContent();
    }

    renderContentList() {
        if (this.state.content) {
            let contentItems = this.state.content.map((contentObject, index) => {
                if (contentObject.type === 'ARTICLE') {
                    return <ContentItemArticle onArticleUnlock={this.onArticleUnlock.bind(this)} key={'contentItem' + index} className='contentOverview__listItem' contentObject={contentObject} purchaseRequired={ContentService.isPurchaseRequired(contentObject)}/>;
                } else if (contentObject.type === 'IMAGE') {
                    return <ContentItemImage onArticleUnlock={this.onArticleUnlock.bind(this)} key={'contentItem' + index} className='contentOverview__listItem' contentObject={contentObject} purchaseRequired={ContentService.isPurchaseRequired(contentObject)}/>;
                } else if (contentObject.type === 'AUDIO') {
                    return <ContentItemAudio onArticleUnlock={this.onArticleUnlock.bind(this)} key={'contentItem' + index} className='contentOverview__listItem' contentObject={contentObject} purchaseRequired={ContentService.isPurchaseRequired(contentObject)}/>;
                } else if (contentObject.type === 'VIDEO') {
                    return <ContentItemVideo onArticleUnlock={this.onArticleUnlock.bind(this)} key={'contentItem' + index} className='contentOverview__listItem' contentObject={contentObject} purchaseRequired={ContentService.isPurchaseRequired(contentObject)}/>;
                } else return null;
            });

            return (
                <ul className='contentOverview__contentList'>
                    {contentItems}
                </ul>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <section className='contentOverview__container centered'>
                {this.renderContentList()}
                <CoinWidget />
            </section >
        );
    }
}