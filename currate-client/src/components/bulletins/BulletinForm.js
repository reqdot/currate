import fieldsData from './fieldsData';
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { deleteBulletin } from '../../actions';
import * as actions from '../../actions';

class BulletinForm extends Component {
  renderFields() {
    fieldsData[0].preValue = this.props.bulletins.title;
    fieldsData[1].preValue = this.props.bulletins.content;
    console.log(fieldsData[0]);
    console.log(fieldsData[1]);

    return _.map(fieldsData, ({ label, name, preValue }) => {
      return (
        <Field
          key={name}
          type="text"
          label={label}
          name={name}
          component={({ input, meta: { error, touched } }) => {
            return (
              <div>
                <label>{label}</label>
                <input
                  {...input}
                  type="text"
                  style={{ marginBottom: '5px' }}
                  placeholder={preValue}
                />
                <div className="red-text" style={{ marginBottom: '20px' }}>
                  {touched && error}
                </div>
              </div>
            );
          }}
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
            <a href="/bulletins" className="red btn-flat white-text">
              Back to the list!
              <i className="material-icons right">reply</i>
            </a>
            <button type="submit" className="teal btn-flat white-text">
              Next!
              <i className="material-icons right">done</i>
            </button>
          </form>
          <button
            onClick={deleteBulletin(this.props.bulletins._id)}
            className="yellow btn-flat blue-text"
          >
            Delete!
            <i className="material-icons right">clear</i>
          </button>
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

BulletinForm = connect(mapStateToProps, actions)(BulletinForm);

export default reduxForm({
  validate,
  form: 'bulletinForm',

  destroyOnUnmount: false
})(BulletinForm);
