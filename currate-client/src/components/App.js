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

    let isSignedIn = false;
    let userId = '';

    this.props.fetchUser();

  try {
    isSignedIn = localStorage.getItem('token');
    if(!userId) {
      const value = JSON.stringify(JSON.parse(isSignedIn).data._id)
      userId = value.substring(1, 25);
    }
  } catch (exception) {

  }

    this.state  = {
      userId
    };

    this.checkSignin = this.checkSignin.bind(this);
}

  checkSignin(userId, isSignedIn) {
    if(userId) {
      this.setState({
        userId
      });
      localStorage.setItem('token', JSON.stringify(isSignedIn))
      return true;
    } else {
      return false;
    }
    }


  render() {
    return (
      <BrowserRouter>
        <Switch>
         <div className="container">
          <Route component={Header} />
          <Route exact path="/" component={Landing} />
          <Route path="/signup/signupform" component={SignupForm} />
          <Route path="/signin/signinform" component={SigninForm} />
          <Route exact path="/bulletins" render={() =>
                    (this.checkSignin ? <Bulletins /> : <SigninForm />) } />
          <Route exact path="/bulletins/new" render={() => (
                    (this.state.isSignedIn || this.props.auth) ?
                                  (<BulletinNew />) :
                                  (<SigninForm />)
                )} />
          <Route path='/bulletins/new/:userId' render={() => (
                    (this.state.isSignedIn || this.props.auth) ?
                            (<BulletinNew />) :
                            (<SigninForm />)
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
