import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText, CardColumns, Button } from 'reactstrap';
import _ from 'lodash';
import '../../css/topButton.css';

class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.props.fetchNews(this.props.auth._id);
    this.props.fetchMyBulletins(this.props.auth._id);
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
          </Card>
          <hr style={{ marginTop: '-0.6px' }} />
        </div>
      );
    }).reverse();
  }

  renderNews() {
    return _.map(this.props.myNews, result => {
      return (
        <div
          style={{ width: '95%', marginLeft: '27px', paddingTop: '8px' }}
          key={result.title}
        >
          <Card
            header
            className="bg-info"
            style={{ textAlign: 'left', color: 'white', opacity: '0.7' }}
          >
            &nbsp;&nbsp;&nbsp;{result.title}&nbsp;&nbsp;( Search Date :&nbsp;{
              result.date
            }&nbsp;)
          </Card>
          <Card body outline color="grey">
            <br />
            News URL :&nbsp;&nbsp;
            <a
              href={result.url}
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              {result.url}
            </a>
            <br />
            &nbsp;&nbsp;
            <span className="blockquote" style={{ fontSize: 'medium' }}>
              {result.description}
            </span>
          </Card>
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
            color: 'green'
          }}
        >
          <h3>All about your info in Currate!</h3>
          <br />
          You want to withdraw?&nbsp;&nbsp;
          <Link to="/withdraw">
            <Button outline color="secondary">
              Withdraw
            </Button>
          </Link>
        </div>

        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            color: 'darkgrey'
          }}
        >
          <h4> Here are your weblogs!</h4>
        </div>
        <br />
        <div>
          <CardColumns className="container" style={{ minWidth: '1080px' }}>
            {this.renderBulletins()}
          </CardColumns>
        </div>
        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            color: 'darkgrey'
          }}
        >
          <h4> Here are your crawling results!</h4>
        </div>
        <br />
        <div>{this.renderNews()}</div>
        <div id="topButton">
          <a href="#top">t▲p</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    myBulletins: state.myBulletins,
    myNews: state.myNews
  };
}

export default connect(mapStateToProps, actions)(MyPage);
