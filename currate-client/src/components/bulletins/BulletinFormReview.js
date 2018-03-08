import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import bulletinFieldsData from './bulletinFieldsData';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

const BulletinFormReview = ({
  onCancel,
  formValues,
  id,
  userId,
  submitBulletin,
  updateBulletin
}) => {
  const reviewFields = _.map(bulletinFieldsData, ({ name, label }) => {
    return (
      <div style={{ paddingTop: '10px' }} key={name}>
        <label style={{ fontSize: 'large' }}>{label}</label>
        <hr style={{ marginTop: '5px' }} />
        <div style={{ fontSize: 'large' }}>{formValues[name]}</div>
        <br />
      </div>
    );
  });

  if(!userId) {
    const value = JSON.stringify(JSON.parse(localStorage.getItem('token')).data._id)
    userId = value.substring(1, 25);
  }

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
            marginLeft: '-350px',
            marginRight: '50px'
          }}
        >
          <CardTitle
            style={{
              marginLeft: '670px',
              marginTop: '40px',
              color: 'green'
            }}
          >
            Review the Content!
          </CardTitle>
          <div style={{ paddingLeft: '400px', paddingTop: '10px' }}>
            {reviewFields}
          </div>
          <div style={{ float: 'right' }}>
            <Button outline color="success" onClick={onCancel}>
              Back
            </Button>
            &nbsp; &nbsp;
            <Button
              color="primary"
              onClick={
                id
                  ? () => updateBulletin(id, formValues)
                  : () => submitBulletin(userId, formValues)
              }
            >
              Save Your Weblog!
              </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

function mapStateToProps(state) {
  console.log('state: ', state);
  return {
    formValues: state.form.bulletinForm.values,
    id: state.bulletins._id,
    userId: state.auth._id
  };
}

export default connect(mapStateToProps, actions)(
  withRouter(BulletinFormReview)
);
