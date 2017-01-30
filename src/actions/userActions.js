import { dispatchedRequest } from '../utils/api';

import { RESTORE_AUTH, LOGIN, LOGOUT } from '../constants/actionTypes';

export function restoreAuth() {
  return dispatchedRequest('GET', '/auth', RESTORE_AUTH);
}

export function login() {
  return dispatchedRequest('GET', '/github/login', LOGIN);
}

export function logout() {
  return dispatchedRequest('GET', '/github/logout', LOGOUT);
}
