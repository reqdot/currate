import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BulletinList from './BulletinList';
import { Button } from 'reactstrap';

class Bulletins extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div>
          <Link to="/bulletins/new">
            <Button
              outline
              color="success"
              style={{
                float: 'right',
                marginTop: '30px',
                marginRight: '35px',
                marginBottom: '40px'
              }}
            >
              ▦ Write New! Create new Weblogs!
            </Button>
          </Link>
        </div>
        <BulletinList />
      </div>
    );
  }
}

export default Bulletins;
