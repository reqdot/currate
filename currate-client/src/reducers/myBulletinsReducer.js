import { FETCH_MY_BULLETINS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MY_BULLETINS:
      return action.payload;
    default:
      return state;
  }
}
