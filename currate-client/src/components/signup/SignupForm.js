import signupFieldsData from './signupFieldsData';
import SignupField from './SignupField';
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupUser } from '../../actions';

import { Card, CardBody, CardTitle, Button } from 'reactstrap';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
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
    return _.map(signupFieldsData, ({ label, name, type }) => {
      return (
        <Field
          key={name}
          type={type}
          label={label}
          name={name}
          value={`this.state.${name}`}
          onChange={this.onInputChange}
          component={SignupField}
        />
      );
    });
  }

  onFormSubmit(event) {
    this.props.signupUser({
      email: this.state.email,
      password: this.state.password
    });
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  render() {
    const { submitting } = this.props;

    return (
      <div className="container" style={{ minWidth: '1080px' }}>
        <Card
          style={{
            width: '80%',
            marginLeft: '110px',
            marginTop: '35px'
          }}
        >
          <CardBody
            style={{
              marginTop: '-30px',
              marginLeft: '-320px',
              marginRight: '50px'
            }}
          >
            <CardTitle
              style={{
                marginLeft: '620px',
                marginTop: '40px',
                color: 'green'
              }}
            >
              Be a Currater! Join our trip!
            </CardTitle>

            <div style={{ marginLeft: '370px', marginTop: '20px' }}>
              <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                {this.renderFields()}

                <Button
                  color="primary"
                  type="submit"
                  disable={submitting}
                  style={{ float: 'right', marginRight: '22px' }}
                >
                  Sign up!
                </Button>
              </form>

              <Link to="/signin/signinform">
                <Button outline color="success" style={{ marginLeft: '25px' }}>
                  Login!
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
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Please enter your password at least 8 characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = 'Please enter your password at least 8 characters';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Please check your password';
  }
  return errors;
}

SignupForm = connect(null, { signupUser })(SignupForm);

export default reduxForm({
  form: 'signupForm',
  validate
})(SignupForm);
