import fetch from 'isomorphic-fetch';

import { GET_USER } from '../constants/actionTypes';

export function getUser() {
  return {
    type: GET_USER,
    payload: { user: { email: 'joe@blow.com' } },
  } 
}
