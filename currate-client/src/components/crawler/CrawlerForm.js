import React, { Component } from 'react';
import { fetchUrl } from '../../actions';
import { connect } from 'react-redux';
import { Card, Form, Button, Input } from 'reactstrap';
import _ from 'lodash';
import '../../css/CrawlerForm.css';

class CrawlerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    console.log(this.state.value);
    this.props.fetchUrl(this.state.value);
    e.preventDefault();
  }

  renderResults() {
    return _.map(this.props.crawlerResults.value, result => {
      return (
        <div
          style={{ width: '90%', marginLeft: '55px', paddingTop: '8px' }}
          key={result.name}
        >
          <Card
            header
            className="bg-info"
            style={{ textAlign: 'left', color: 'white', opacity: '0.7' }}
          >
            &nbsp;&nbsp;&nbsp;{result.name}
          </Card>
          <Card body outline color="grey">
            <br />
            News URL :&nbsp;&nbsp;
            <a href={result.url} target="_blank" style={{textDecoration:'none'}}>{result.url}</a>
            <br />
            &nbsp;&nbsp;
            <span className="blockquote" style={{fontSize:'medium'}}>{result.description}</span>
            <br />
          </Card>
          <br />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
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
              <span className="input-group-btn" >
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
          <div id="topButton">
            <a href="#top">TOP</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ crawlerResults }) {
  return { crawlerResults };
}


export default connect(mapStateToProps, { fetchUrl })(CrawlerForm);
