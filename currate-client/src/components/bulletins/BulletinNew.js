import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchBulletin } from '../../actions';
import BulletinForm from './BulletinForm';
import BulletinFormReview from './BulletinFormReview';

class BulletinNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: false
    };
  }

  componentDidMount() {
    const id = document.location.href.split('/');
    this.props.fetchBulletin(id[5]);
  }

  renderContent() {
    if (this.state.review) {
      return (
        <BulletinFormReview onCancel={() => this.setState({ review: false })} />
      );
    }
    return (
      <BulletinForm
        bulletins={this.props.bulletins}
        onBulletinSubmit={() => this.setState({ review: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ bulletins }) {
  return { bulletins };
}

BulletinNew = connect(mapStateToProps, { fetchBulletin })(BulletinNew);

export default reduxForm({
  form: 'bulletinForm'
})(BulletinNew);
