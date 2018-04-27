import React, { Component, PropTypes } from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom'

import Header from '../../components/Header/Header';
import ContentOverview from '../ContentOverview/ContentOverview';
import DetailPage from '../DetailPage/DetailPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <article className='app__container'>
        <Header />
        <Switch>
          <Route exact path='/' component={ContentOverview} />
          <Route exact path='/article/:id' component={DetailPage} />
        </Switch>
      </article >
    );
  }
}