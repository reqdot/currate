import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import fieldsData from './fieldsData';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const BulletinFormReview = ({
  onCancel,
  formValues,
  id,
  submitBulletin,
  updateBulletin,
  history
}) => {
  const reviewFields = _.map(fieldsData, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={
          id
            ? () => updateBulletin(id, formValues)
            : () => submitBulletin(formValues, history)
        }
      >
        Save Bulletin!
        <i className="material-icons right">done_all</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    formValues: state.form.bulletinForm.values,
    id: state.bulletins._id
  };
}

export default connect(mapStateToProps, actions)(
  withRouter(BulletinFormReview)
);
