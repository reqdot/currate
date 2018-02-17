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

export const fetchBulletin = id => async dispatch => {
  const res = await axios.get(`/api/bulletins/new/${id}`);
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};

export const updateBulletin = (id, values) => async dispatch => {
  const res = await axios.patch(`/api/bulletins/new/${id}`, values);
  window.location.href = '/bulletins';
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};

export const deleteBulletin = id => async dispatch => {
  const res = await axios.delete(`/api/bulletins/new/${id}`, id);
  window.location.href = '/bulletins';
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};
