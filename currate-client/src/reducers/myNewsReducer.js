import { FETCH_MY_NEWS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MY_NEWS:
      return action.payload;
    default:
      return state;
  }
}
