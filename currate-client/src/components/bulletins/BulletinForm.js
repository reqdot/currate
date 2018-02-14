import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import BulletinField from './BulletinField';
import fieldsData from './fieldsData';

class BulletinForm extends Component {
  renderFields() {
    return _.map(fieldsData, ({ label, name }) => {
      return (
        <Field
          key={name}
          type="text"
          label={label}
          name={name}
          component={BulletinField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onBulletinSubmit)}>
          {this.renderFields()}
          <Link to="/bulletins" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(fieldsData, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'bulletinForm',
  destroyOnUnmount: false
})(BulletinForm);
