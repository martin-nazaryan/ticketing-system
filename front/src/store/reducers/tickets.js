import {SET_MY_TICKETS, SET_OPENED_TICKETS} from '../actions/tickets/types';

const defaultState = {
  opened: [],
  my: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_OPENED_TICKETS:
      return {
        ...state,
        opened: action.payload,
      };
    case SET_MY_TICKETS:
      return {
        ...state,
        my: action.payload,
      };
    default:
      return state;
  }
};
