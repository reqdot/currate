import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import bulletinsReducer from './bulletinsReducer';
import crawlerReducer from './crawlerReducer';
import newsReducer from './newsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  bulletins: bulletinsReducer,
  crawlerResults: crawlerReducer,
  news: newsReducer
});
