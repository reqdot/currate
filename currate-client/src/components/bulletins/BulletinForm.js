import fieldsData from './fieldsData';
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { deleteBulletin } from '../../actions';
import * as actions from '../../actions';
import { Card, CardBody, CardTitle, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                <label style={{ fontSize: 'large' }}>{label}</label>
                <hr style={{ marginTop: '5px' }} />
                <Input
                  {...input}
                  type="textarea"
                  placeholder={preValue}
                  style={{ width: '100%' }}
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

  render() {
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
                <div style={{ float: 'right' }}>
                  <Link to="/bulletins">
                    <Button outline color="success">
                      Back to the list!
                    </Button>
                  </Link>
                  &nbsp; &nbsp;
                  <Button
                    outline
                    color="danger"
                    onClick={deleteBulletin(this.props.bulletins._id)}
                  >
                    Delete!
                  </Button>
                  &nbsp; &nbsp;
                  <Button color="primary" type="submit">
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
