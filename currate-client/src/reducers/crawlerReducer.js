import { FETCH_URL } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_URL:
      return action.payload;

    default:
      return state;
  }
}
