import bulletinFieldsData from './bulletinFieldsData';
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteBulletin } from '../../actions';
import * as actions from '../../actions';
import { Card, CardBody, CardTitle, Input, Button } from 'reactstrap';

class BulletinForm extends Component {
  renderFields() {
    return _.map(bulletinFieldsData, ({ label, name }) => {
      return (
        <Field
          key={name}
          type="text"
          label={label}
          name={name}
          component={({ input, meta: { error, touched } }) => {
            return (
              <div style={{ marginLeft: '370px', marginTop: '50px' }}>
                <label style={{ fontSize: 'large' }}>{label}</label>
                <hr style={{ marginTop: '5px' }} />
                <Input
                  {...input}
                  type="textarea"
                  placeholder={
                    label === 'Title'
                      ? this.props.bulletins.title
                      : this.props.bulletins.content
                  }
                  style={{
                    width: '100%',
                    height: '100px',
                    background: 'linear-gradient(#f9efaf, #f7e98d)'
                  }}
                />
                <div style={{ marginBottom: '20px', color: 'red' }}>
                  {touched && error}
                </div>
              </div>
            );
          }}
        />
      );
    });
  }

  renderButton() {
    if (this.props.bulletins._id) {
      return (
        <div>
          <Button
            outline
            color="danger"
            style={{
              marginTop: '-24px',
              marginRight: '6px',
              float: 'right'
            }}
            onClick={deleteBulletin(this.props.bulletins._id)}
          >
            Delete!
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container" style={{ minWidth: '1080px' }}>
        <Card
          style={{
            width: '80%',
            marginLeft: '110px',
            marginTop: '5px'
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
                marginLeft: '640px',
                marginTop: '40px',
                color: 'green'
              }}
            >
              Create New Weblog!
            </CardTitle>

            <div style={{ marginTop: '-30px' }}>
              <form
                onSubmit={this.props.handleSubmit(this.props.onBulletinSubmit)}
              >
                {this.renderFields()}
                <Link
                  style={{
                    fontSize: 'large',
                    marginLeft: '370px'
                  }}
                  to="/bulletins"
                >
                  Back to the list!
                </Link>
                <div
                  style={{
                    marginLeft: '590px',
                    marginTop: '-10px'
                  }}
                >
                  <Button
                    color="primary"
                    type="submit"
                    style={{ float: 'right' }}
                  >
                    Next!
                  </Button>
                  &nbsp; &nbsp;
                  {this.renderButton()}
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(bulletinFieldsData, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });
  return errors;
}

BulletinForm = connect(null, actions)(BulletinForm);

export default reduxForm({
  validate,
  form: 'bulletinForm',

  destroyOnUnmount: false
})(BulletinForm);
