import signinFieldsData from './signinFieldsData';
import SigninField from './SigninField';
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { signinUser } from '../../actions';

import { Card, CardBody, CardTitle, Button } from 'reactstrap';

class SigninForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      fireRedirect: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderFields() {
    return _.map(signinFieldsData, ({ label, name, type }) => {
      return (
        <Field
          key={name}
          type={type}
          label={label}
          name={name}
          value={`this.state.${name}`}
          onChange={this.onInputChange}
          component={SigninField}
        />
      );
    });
  }

  onFormSubmit() {
    this.props.signinUser({
      email: this.state.email,
      password: this.state.password
    });
    this.setState({
      email: '',
      password: '',
      fireRedirect: true
    });
  }

  render() {
    const { submitting } = this.props;
    const { from } = this.props.location || '/';
    const { fireRedirect } = this.state;

    return (
      <div>
        <Card
          style={{
            width: '80%',
            marginLeft: '110px',
            marginTop: '50px'
          }}
        >
          <CardBody
            style={{
              marginTop: '-30px',
              marginLeft: '-320px',
              marginRight: '50px',
              marginBottom: '20px'
            }}
          >
            <CardTitle
              style={{
                marginLeft: '580px',
                marginTop: '40px',
                color: 'green'
              }}
            >
              Sign in and Share your opinions!
            </CardTitle>

            <div style={{ marginLeft: '370px', marginTop: '30px' }}>
              <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                {this.renderFields()}
                <Button
                  color="primary"
                  type="submit"
                  disable={submitting}
                  style={{
                    float: 'right',
                    marginTop: '5px',
                    marginRight: '22px'
                  }}
                >
                  Sign in!
                </Button>
              </form>
              {fireRedirect && <Redirect to={from || '/'} />}
              <Link to="/signup/signupform">
                <Button
                  outline
                  color="success"
                  style={{ marginTop: '5px', marginLeft: '25px' }}
                >
                  Sign up!
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter your email';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Please enter the correct password';
  }

  return errors;
}

SigninForm = connect(null, { signinUser })(SigninForm);

export default reduxForm({
  form: 'signinForm',
  validate
})(SigninForm);
