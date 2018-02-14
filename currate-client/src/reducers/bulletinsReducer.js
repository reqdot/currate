import { FETCH_BULLETINS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BULLETINS:
      return action.payload;
    default:
      return state;
  }
}
