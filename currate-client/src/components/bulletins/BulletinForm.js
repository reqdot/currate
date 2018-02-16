import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import fieldsData from './fieldsData';
import BulletinField from './BulletinField';

class BulletinForm extends Component {
  renderFields() {
    return _.map(fieldsData, ({ name, label }) => {
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
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.onBulletinSubmit)}>
            {this.renderFields()}
            <Link to="/bulletins" className="red btn-flat white-text">
              Cancel
            </Link>
            <button type="submit" className="teal btn-flat white-text">
              Next
              <i className="material-icons right">done</i>
            </button>
          </form>
        </div>
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

function mapStateToProps({ bulletins }) {
  console.log(bulletins);
  return { bulletins };
}

BulletinForm = connect(mapStateToProps)(BulletinForm);

export default reduxForm({
  validate,
  form: 'bulletinForm',
  destroyOnUnmount: false
})(BulletinForm);
