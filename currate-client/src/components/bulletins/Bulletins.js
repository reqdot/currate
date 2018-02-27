import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BulletinList from './BulletinList';
import { Button } from 'reactstrap';

class Bulletins extends Component {
  render() {
    return (
      <div>
        <br />
        <div>
          <Link to="/bulletins/new">
            <Button outline color="success" style={{ float: 'right' }}>
              Write New!
            </Button>
          </Link>
        </div>
        <BulletinList />
      </div>
    );
  }
}

export default Bulletins;
