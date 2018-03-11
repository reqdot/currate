import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Bulletins from './bulletins/Bulletins';
import BulletinNew from './bulletins/BulletinNew';
import ChatsForm from './chats/ChatsForm';
import CrawlerForm from './crawler/CrawlerForm';
import SignupForm from './signup/SignupForm';
import SigninForm from './signin/SigninForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: ''
    }

    this.props.fetchUser();
    this.props.fetchUser2();

}


  render() {
    return (
      <BrowserRouter>
        <Switch>
         <div className="container">
          <Route component={Header} />
          <Route exact path="/" render={() => <Landing />} />
          <Route path="/signup/signupform" render={() => <SignupForm />} />
          <Route path="/signin/signinform" render={() => <SigninForm />} />
          <Route exact path="/bulletins" render={() => (
                    (this.state.isSignedIn || this.props.auth) ?
                                  (<Bulletins />) :
                                  (<SigninForm />)
                )} />
          <Route exact path="/bulletins/new" render={() => (
                    (this.state.isSignedIn || this.props.auth) ?
                                  (<BulletinNew />) :
                                  (<SigninForm />)
                )} />
          <Route path='/bulletins/new/:userId' render={() => (
                    (this.state.isSignedIn || this.props.auth._id) ?
                            (<BulletinNew />) :
                            (<Bulletins />)
                )} />
          <Route path="/chats" render={() => (
            (this.state.isSignedIn || this.props.auth) ?
                          (<ChatsForm />) :
                          (<SigninForm />)
                 )} />
          <Route path="/crawler" render={() => (
            (this.state.isSignedIn || this.props.auth) ?
                          (<CrawlerForm />) :
                          (<SigninForm />)
                 )} />
        </div>
      </Switch>
    </BrowserRouter>

    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    bulletins: state.bulletins
}
}

export default connect(mapStateToProps, actions)(App);
