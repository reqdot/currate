import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Label } from 'react-bootstrap';
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
        <div className="MainForm">
          <div className="Instructions">
            <h2>
              <Label>Input the News keywords you would like to crawl</Label>
            </h2>
          </div>
          <div className="Input">
            <form onSubmit={this.handleSubmit}>
              <FormGroup bsSize="large">
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="e.g. google.com"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button
                bsSize="large"
                bsStyle="primary"
                type="submit"
                onClick={() => fetchUrl(this.state.value)}
              >
                Crawl!
              </Button>
            </form>
          </div>
        </div>
        <p style={{ color: 'black', fontSize: 'large' }}>Search Results</p>
        <hr />
        <div>{this.renderResults()}</div>
      </div>
    );
  }
}

function mapStateToProps({ crawlerResults }) {
  return { crawlerResults };
}

export default connect(mapStateToProps, { fetchUrl })(CrawlerForm);
