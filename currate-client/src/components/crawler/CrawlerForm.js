import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Label } from 'react-bootstrap';
import { fetchUrl } from '../../actions';
import { connect } from 'react-redux';

class CrawlerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valid: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      valid: this.getValidationState() === 'success'
    });
  }

  getValidationState() {
    if (this.state.value.length <= 0) return null;
    //TODO use a lib to validate input as url
    return this.state.value.match(/((http|https):\/\/www\.)?.+\..+/)
      ? 'success'
      : 'error';
  }

  handleSubmit(e) {
    console.log(this.state.value);
    this.props.fetchUrl(this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <div className="MainForm">
        <div className="Instructions">
          <h2>
            <Label>Input the website you would like to crawl</Label>
          </h2>
        </div>
        <div className="Input">
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              bsSize="large"
              validationState={this.getValidationState()}
            >
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
              disabled={!this.state.valid}
            >
              Crawl!
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
export default connect(null, { fetchUrl })(CrawlerForm);
