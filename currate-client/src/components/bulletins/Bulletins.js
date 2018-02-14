import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BulletinList from './BulletinList';

class Bulletins extends Component {
  render() {
    return (
      <div>
        <BulletinList />
        <div className="fixed-action-btn">
          <Link to="/bulletins/new" className="btn-floating btn-large red">
            <i className="large material-icons">mode_edit</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Bulletins;
