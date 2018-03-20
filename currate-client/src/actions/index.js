import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_BULLETINS } from './types';
import { FETCH_MY_BULLETINS } from './types';
import { FETCH_URL } from './types';
import { FETCH_NEWS } from './types';
import { FETCH_MY_NEWS } from './types';

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
  const res = await axios.post('/api/users', userInfo);
  window.location.href = '/signin/signinform';
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const signinUser = userInfo => async dispatch => {
  const res = await axios.post('/api/users/signin', userInfo);
  localStorage.setItem('token', JSON.stringify(res));
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const signoutUser = () => async dispatch => {
  const res = await axios.get('/api/signout');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const withdrawUser = id => async dispatch => {
  await axios.delete(`/api/withdraw/${id}`, id);
  window.location = '/';
};

export const fetchUrl = terms => async dispatch => {
  const res = await axios.get(`/api/crawler?terms=${terms}`);
  dispatch({
    type: FETCH_URL,
    payload: res.data
  });
};

export const submitNews = (userId, values) => async dispatch => {
  const res = await axios.post(`/api/crawler/news/${userId}`, values);
  window.location = '/crawler';
  dispatch({ type: FETCH_NEWS, payload: res.data });
};

export const submitMyNews = (userId, values) => async dispatch => {
  const res = await axios.post(`/api/crawler/news/${userId}`, values);
  window.location = '/crawler/mynews';
  dispatch({ type: FETCH_NEWS, payload: res.data });
};

export const fetchNewsList = () => async dispatch => {
  const res = await axios.get('/api/crawler/news');
  dispatch({ type: FETCH_NEWS, payload: res.data });
};

export const fetchNews = userId => async dispatch => {
  const res = await axios.get(`/api/crawler/news/${userId}`);
  dispatch({
    type: FETCH_MY_NEWS,
    payload: res.data
  });
};

export const deleteNews = id => async dispatch => {
  await axios.delete(`/api/crawler/news/${id}`, id);
  window.location = '/crawler';
};

export const deleteMyNews = id => async dispatch => {
  await axios.delete(`/api/crawler/news/${id}`, id);
  window.location = '/crawler/mynews';
};

export const submitBulletin = (userId, values) => async dispatch => {
  const res = await axios.post(`/api/bulletins/new/${userId}`, values);
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};

export const fetchBulletins = () => async dispatch => {
  const res = await axios.get('/api/bulletins');
  localStorage.setItem('token', JSON.stringify(res));
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};

export const fetchBulletin = id => async dispatch => {
  const res = await axios.get(`/api/bulletins/new/${id}`);
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};

export const fetchMyBulletins = userId => async dispatch => {
  const res = await axios.get(`/api/bulletins/mybulletins/${userId}`);
  dispatch({ type: FETCH_MY_BULLETINS, payload: res.data });
};

export const updateBulletin = (id, values) => async dispatch => {
  const res = await axios.patch(`/api/bulletins/new/${id}`, values);
  dispatch({ type: FETCH_BULLETINS, payload: res.data });
};

export const deleteBulletin = id => async dispatch => {
  await axios.delete(`/api/bulletins/new/${id}`, id);
};
