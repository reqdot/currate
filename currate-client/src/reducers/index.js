import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import bulletinsReducer from './bulletinsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  bulletins: bulletinsReducer
});
