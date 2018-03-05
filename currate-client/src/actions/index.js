import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_BULLETINS } from './types';
import { FETCH_URL } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const fetchUser2 = () => async dispatch => {
  const res = await axios.get('/api/users/me');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const signupUser = userInfo => async dispatch => {
  console.log('action user:', userInfo);
  const res = await axios.post('/api/users', userInfo);
  window.location.href = '/signin/signinform';
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const signinUser = userInfo => async dispatch => {
  console.log('action signinuser:', userInfo);
  const res = await axios.post('/api/users/signin', userInfo);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const fetchUrl = url => async dispatch => {
  const res = await axios.get(`/api/crawler?url=${url}`);
  dispatch({
    type: FETCH_URL,
    payload: res.data
  });
};

export const submitBulletin = (values, history) => async dispatch => {
  const res = await axios.post('/api/bulletins/', values);

  history.push('/bulletins');
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
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
