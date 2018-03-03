import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import '../css/Header.css';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'still deciding';
      case false:
        return (
          <div>
            <Button outline color="success">
              <Link to="/signin/signinForm">Login with ID</Link>
            </Button>
            <div className="divider" />
            <a href="/auth/google">
              <Button outline color="success">
                Login with Google
              </Button>
            </a>
          </div>
        );
      default:
        return (
          <div>
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
            <a href="/api/logout">
              <Button outline color="secondary">
                Logout
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
            <Link to="/">
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

export default connect(mapStateToProps)(Header);
