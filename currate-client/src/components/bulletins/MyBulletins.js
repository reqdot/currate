import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Card, CardText, CardColumns, Button } from 'reactstrap';
import '../../css/topButton.css';

class MyBulletins extends Component {
  constructor(props) {
    super(props);

    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchMyBulletins(this.props.auth._id);
  }

  renderButton(user, id) {
    if (user === this.props.auth._id) {
      return (
        <Link to={`/bulletins/new/${id}`}>
          <Button style={{ marginTop: '-13px', float: 'right' }}>Modify</Button>
        </Link>
      );
    } else {
      return (
        <div>
          <br />
        </div>
      );
    }
  }

  renderBulletins() {
    return _.map(this.props.myBulletins, bulletin => {
      return (
        <div className="container" key={bulletin.date}>
          <Card
            header
            className="bg-primary"
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
            {this.renderButton(bulletin._user, bulletin._id)}
          </Card>
          <hr style={{ marginTop: '-0.6px' }} />
        </div>
      );
    }).reverse();
  }

  render() {
    return (
      <div className="container" style={{ minWidth: '1080px' }}>
        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            color: 'darkgrey'
          }}
        >
          <h4>You can see your bulletins here!</h4>
        </div>
        <br />
        <br />
        <CardColumns className="container" style={{ minWidth: '1080px' }}>
          {this.renderBulletins()}
        </CardColumns>
        <div id="topButton">
          <a href="#top">t▲p</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myBulletins: state.myBulletins,
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(MyBulletins);
