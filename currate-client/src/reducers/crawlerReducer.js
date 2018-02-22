import { FETCH_URL } from '../actions/types';

export default function(state = {}, action) {
  console.log('action.payload: ', action.payload);
  switch (action.type) {
    case FETCH_URL:
      return action.payload;

    default:
      return state;
  }
}
