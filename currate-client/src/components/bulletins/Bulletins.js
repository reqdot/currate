import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BulletinList from './BulletinList';
import { Button } from 'reactstrap';

class Bulletins extends Component {
  render() {
    return (
      <div className="container" style={{ minWidth: '1080px' }}>
        <br />
        <div>
          <Link to="/bulletins/new">
            <Button
              outline
              color="success"
              style={{
                float: 'right',
                marginTop: '30px',
                marginRight: '32px',
                marginBottom: '40px'
              }}
            >
              ▦ Write New! Create new Weblogs!
            </Button>
          </Link>
          <Button
            outline
            color="primary"
            style={{
              float: 'right',
              marginTop: '30px',
              marginRight: '5px',
              marginBottom: '40px'
            }}
            onClick={() =>
              window.open(
                '/bulletins/mybulletins',
                '_blank',
                'width=1000,height=400,left=175,top=175'
              )
            }
          >
            ＃ My Bulletins!
          </Button>
        </div>
        <BulletinList />
      </div>
    );
  }
}

export default Bulletins;
