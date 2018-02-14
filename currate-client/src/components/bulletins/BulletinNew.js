import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BulletinForm from './BulletinForm';
import BulletinFormReview from './BulletinFormReview';

class BulletinNew extends Component {
  constructor(props) {
    super(props);
    this.state = { review: false };
  }

  renderContent() {
    if (this.state.review) {
      return (
        <BulletinFormReview onCancel={() => this.setState({ review: false })} />
      );
    }
    return (
      <BulletinForm onBulletinSubmit={() => this.setState({ review: true })} />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: 'bulletinForm'
})(BulletinNew);
