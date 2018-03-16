import React, { Component } from 'react';
import { fetchUrl } from '../../actions';
import { submitMyNews } from '../../actions';
import { deleteMyNews } from '../../actions';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Card, Form, Button, Input } from 'reactstrap';
import _ from 'lodash';
import '../../css/topButton.css';

class MyNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    this.props.fetchUrl(this.state.value);
    e.preventDefault();
  }

  renderButton(user, id) {
    if (user === this.props.auth._id) {
      return (
        <div>
          <Button
            outline
            color="secondary"
            style={{ width: '10%', marginLeft: '90%' }}
            onClick={deleteMyNews(id)}
          >
            Delete
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <br />
        </div>
      );
    }
  }

  renderResults() {
    return _.map(this.props.crawlerResults, result => {
      return (
        <div
          style={{ width: '90%', marginLeft: '55px', paddingTop: '8px' }}
          key={result.title}
        >
          <Card
            header
            className="bg-info"
            style={{ textAlign: 'left', color: 'white', opacity: '0.7' }}
          >
            &nbsp;&nbsp;&nbsp;{result.title}
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
            <br />
            <Button
              outline
              color="primary"
              style={{ width: '30%', marginLeft: '70%' }}
              onClick={submitMyNews(this.props.auth._id, {
                title: result.title,
                url: result.url,
                description: result.description
              })}
            >
              Save this news!
            </Button>
          </Card>
          <br />
        </div>
      );
    });
  }

  renderNews() {
    return _.map(this.props.myNews, result => {
      return (
        <div
          style={{ width: '90%', marginLeft: '55px', paddingTop: '8px' }}
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
            <hr />
            {this.renderButton(result._user, result._id)}
          </Card>
        </div>
      );
    }).reverse();
  }

  render() {
    this.props.fetchNews(this.props.auth._id);

    return (
      <div className="container" style={{ minWidth: '1080px' }}>
        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            color: 'darkgrey'
          }}
        >
          <h4>Input the News keywords you would like to crawl</h4>
        </div>
        <div>
          <Form style={{ paddingTop: '15px' }} onSubmit={this.handleSubmit}>
            <div
              className="input-group"
              style={{
                width: '75%',
                paddingLeft: '200px',
                paddingRight: '100px',
                marginLeft: '88px'
              }}
            >
              <Input
                type="text"
                name="term"
                style={{
                  background: 'linear-gradient(#f9efaf, #f7e98d)'
                }}
                value={this.state.value}
                placeholder="e.g. currency exchange rate"
                onChange={this.handleChange}
              />
              <span className="input-group-btn">
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => fetchUrl(this.state.value)}
                >
                  Crawl!
                </Button>
              </span>
            </div>
          </Form>
          <br />
          <br />
          <br />
          <span
            style={{
              marginLeft: '54px',
              color: 'green',
              fontSize: 'x-large'
            }}
          >
            Search Results
          </span>
          <hr style={{ width: '90%', paddingRight: '10px' }} />
          <div>{this.renderResults()}</div>
          <div
            style={{
              marginTop: '40px',
              textAlign: 'center',
              color: 'darkgrey'
            }}
          >
            <h4> Here are your crawling results!</h4>
          </div>
          <div>{this.renderNews()}</div>
          <div id="topButton">
            <a href="#top">t▲p</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.auth);
  return {
    auth: state.auth,
    myNews: state.myNews,
    crawlerResults: state.crawlerResults
  };
}

export default connect(mapStateToProps, actions)(MyNews);
