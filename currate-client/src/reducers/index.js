import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import bulletinsReducer from './bulletinsReducer';
import myBulletinsReducer from './myBulletinsReducer';
import crawlerReducer from './crawlerReducer';
import newsReducer from './newsReducer';
import myNewsReducer from './myNewsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  bulletins: bulletinsReducer,
  myBulletins: myBulletinsReducer,
  crawlerResults: crawlerReducer,
  news: newsReducer,
  myNews: myNewsReducer
});
