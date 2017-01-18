import fetch from 'isomorphic-fetch';

import { ERROR, UNAUTHORIZED, PENDING, SUCCESS } from '../constants/requestConstants';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3000/api/v1';

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }
}


function handleStatus(response, redirect) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else if (response.status == 401) {
    return Promise.reject(new UnauthorizedError());
  } else {
    return Promise.reject(new ServerError(response.statusText));
  }
}

export function dispatchedRequest(method, url, actionType, data, json = true, context) {
  // we dispatch the pending action with some data so that the reducers
  // can know what data we're attempting to operate on, even if that
  // operation isn't yet successful.
  return dispatch => {
    dispatch({ type: actionType, status: PENDING, payload: data || {}, context: context });
    return fetch(BASE_URL + url, {
      method: method,
      credentials: 'include', // CORS Hack
      headers: json ? { 'Content-Type': 'application/json; charset=utf-8'} : false,
      body: json ? JSON.stringify(data) : data })
      .then(handleStatus)
      .then(payload => payload.json())
    //.then(json => { console.log(json); return json })
      .then(json => dispatch({ type: actionType, status: SUCCESS, payload: json, context: context }))
      .catch(error => {
        const warn = (console.warn || console.log).bind(console);
        let status = ERROR;
        switch (error.name) {
          case 'UnauthorizedError': status = UNAUTHORIZED; break;
          case 'ServerError':
            status = ERROR;
            warn('Server Error: ' + error.message);
            break;
          default:
            warn('Error after request: ' + error.message);
            warn(error.stack);
            status = ERROR;
            break;
        }
        return dispatch({ type: actionType, status: status, payload: Object.assign(data || {}, {message: error.message || {}}), context: context })
      });
  };
}
