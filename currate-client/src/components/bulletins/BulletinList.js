import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Card, CardText, CardColumns, Button } from 'reactstrap';
import '../../css/BulletinList.css';

class BulletinList extends Component {
  componentDidMount() {
    this.props.fetchBulletins();
  }

  renderBulletins() {
    return _.map(this.props.bulletins, (bulletin) => {
      return (
        <div className="container" key={bulletin.date}>
          <Card
            header
            className='bg-info'
            style={{ textAlign: 'left', color: 'white', opacity: '0.7' }}
          >
            &nbsp;&nbsp;{bulletin.title}
          </Card>
          <Card body outline color="grey">
            <CardText style={{ color: 'primary' }}>
              <p className="blockquote">{bulletin.content}</p>
              <br />
              <p
                style={{
                  textAlign: 'right',
                  color: 'darkgrey',
                  fontSize: 'medium'
                }}
              >
                Date: {new Date(bulletin.date).toLocaleDateString()}
              </p>
            </CardText>
            <Link to={`/bulletins/new/${bulletin._id}`}>
              <Button style={{ float: 'right' }}>Modify</Button>
            </Link>
          </Card>
          <hr style={{ marginTop: '1px' }} />
        </div>
      );
    }).reverse()
  }
  render() {
    return (
      <div>
        <br />
        <br />
        <CardColumns className="container">
          {this.renderBulletins()}
        </CardColumns>
        <div id="topButton">
          <a href="#top">TOP</a>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    bulletins: state.bulletins,
  };
}

export default connect(mapStateToProps, actions)(BulletinList);
