import {SET_MY_TICKETS, SET_OPENED_TICKETS} from './types';

export const setOpenedTickets = (opened) => ({
  type: SET_OPENED_TICKETS,
  payload: opened,
});

export const setMyTickets = (my) => ({
  type: SET_MY_TICKETS,
  payload: my,
});
