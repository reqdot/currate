import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Introduction from './Introduction';
import Bulletins from './bulletins/Bulletins';
import BulletinNew from './bulletins/BulletinNew';
import ChatForm from './chats/ChatsForm';
import ChatsJoinForm from './chats/ChatsJoinForm';
import CrawlerForm from './crawler/CrawlerForm';
import SignupForm from './signup/SignupForm';

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
          <Route path="/introduction" component={Introduction} />
          <Route exact path="/bulletins" component={Bulletins} />
          <Route path="/bulletins/new" component={BulletinNew} />
          <Route exact path="/chats" component={ChatForm} />
          <Route path="/chats/chatsjoinform" component={ChatsJoinForm} />
          <Route path="/crawler" component={CrawlerForm} />
          <Route path="/signup/signupform" component={SignupForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
