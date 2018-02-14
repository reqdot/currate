import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Bulletins from './bulletins/Bulletins';
import BulletinNew from './bulletins/BulletinNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route component={Header} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/bulletins" component={Bulletins} />
          <Route path="/bulletins/new" component={BulletinNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
