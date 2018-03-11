import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions'
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import '../css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props)

    this.removeLocalStorage = this.removeLocalStorage.bind(this)
  }


  removeLocalStorage() {
    localStorage.removeItem('token');
  }

  componentDidMount() {
    if(!localStorage.getItem('token')) {
    localStorage.removeItem('token');
    }
  }

  renderContent() {
    if(localStorage.getItem('token')||this.props.auth) {
      return (
        <div>
        <span style={{ color: 'grey'}}>
        {this.props.auth.email}
        </span>
        , Welcome! &nbsp;
          <Link to="/bulletins">
            <Button outline color="secondary">
              Weblogs
            </Button>
          </Link>
          <div className="divider" />
          <Link to="/crawler">
            <Button outline color="secondary">
              Crawler
            </Button>
          </Link>
          <div className="divider" />
          <Link to="/chats">
            <Button color="danger">Chats</Button>
          </Link>
          <div className="divider" />
          <a href="/api/signout">
            <Button outline color="secondary" onClick={this.removeLocalStorage}>
              Logout
            </Button>
            </a>
        </div>
      );
    } else {
      return (
        <div>
          <Button outline color="info">
            <Link id="loginLink" to="/signin/signinForm">Login with ID</Link>
          </Button>
          <div className="divider" />
          <a href="/auth/google">
            <Button outline color="success">
              Login with Google
            </Button>
          </a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <Navbar color="faded" light expand="md">
          <NavbarBrand>
            <Link to="/" style={{textDecoration:'none'}}>
              <h1>Currate</h1>
            </Link>
          </NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem>{this.renderContent()}</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Header);
