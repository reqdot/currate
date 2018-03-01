import React, { Component } from 'react';
import { Form, Button, Input } from 'reactstrap';
import { fetchUrl } from '../../actions';
import { connect } from 'react-redux';

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
    let results = JSON.stringify(this.props.crawlerResults.value);
    return <div>{results}</div>;
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
                paddingLeft: '20px',
                paddingRight: '100px',
                marginLeft: '-50px'
              }}
            >
              <Input
                type="text"
                className="form-control"
                name="term"
                value={this.state.value}
                placeholder="e.g. currency exchange rate"
                onChange={this.handleChange}
              />
              <span className="input-group-btn">
                <Button
                  className="btn btn-default"
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
              marginLeft: '34px',
              color: 'green',
              fontSize: 'x-large'
            }}
          >
            Search Results
          </span>
          <hr />
          <div>{this.renderResults()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ crawlerResults }) {
  return { crawlerResults };
}

export default connect(mapStateToProps, { fetchUrl })(CrawlerForm);
