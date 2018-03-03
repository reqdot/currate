import bulletinFieldsData from './bulletinFieldsData';
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { deleteBulletin } from '../../actions';
import * as actions from '../../actions';
import { Card, CardBody, CardTitle, Input, Button } from 'reactstrap';

class BulletinForm extends Component {
  renderFields() {
    bulletinFieldsData[0].preValue = this.props.bulletins.title;
    bulletinFieldsData[1].preValue = this.props.bulletins.content;

    return _.map(bulletinFieldsData, ({ label, name, preValue }) => {
      return (
        <Field
          key={name}
          type="text"
          label={label}
          name={name}
          component={({ input, meta: { error, touched } }) => {
            return (
              <div>
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
            style={{ float: 'left' }}
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
      <div>
        <Card
          style={{
            width: '80%',
            marginLeft: '110px',
            marginTop: '30px'
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
                <a
                  style={{
                    fontSize: 'large',
                    marginRight: '500px'
                  }}
                  href="/bulletins"
                >
                  Back to the list!
                </a>
                <div style={{ marginLeft: '590px', marginTop: '-10px' }}>
                  {this.renderButton()}
                  &nbsp; &nbsp;
                  <Button
                    color="primary"
                    type="submit"
                    style={{ float: 'right' }}
                  >
                    Next!
                  </Button>
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
