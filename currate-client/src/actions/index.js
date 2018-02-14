import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_BULLETINS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const submitBulletin = (values, history) => async dispatch => {
  const res = await axios.post('/api/bulletins', values);

  history.push('/bulletins');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBulletins = () => async dispatch => {
  const res = await axios.get('/api/bulletins');

  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};
