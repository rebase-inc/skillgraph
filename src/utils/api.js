import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { Schema, arrayOf, normalize } from 'normalizr'
import * as schema from './schema';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3000/api/v1';

export const LOGIN_URL = BASE_URL + '/github/login';

const FETCH_SETTINGS = {
  credentials: process.env.NODE_ENV === 'production' ? 'omit' : 'include', // CORS Hack
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.message = message;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.message = message;
  }
}

export function dispatchedRequest(endpoint, schema, method = 'GET', data = undefined) {
  const settings = Object.assign({}, FETCH_SETTINGS, { method: method, body: method == 'GET' ? undefined : JSON.stringify(data) });
  return fetch(BASE_URL + endpoint, settings)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (response.status >= 200 && response.status < 300) {
        return json;
      } else if (response.status == 401) {
        return Promise.reject(new UnauthorizedError(response));
      } else {
        return Promise.reject(new ServerError(response));
      }
    })
    .then((json) => {
      json = camelizeKeys(json);
      return Object.assign({}, normalize(json, schema));
    })
    .then(response => ({response}), error => ({ error: error.message || 'Unknown Error Occurred' }));
}

export const fetchAuth = () => dispatchedRequest('/auth', schema.auth);
export const logout = () => dispatchedRequest('/github/logout', schema.auth);
export const startScan = () => dispatchedRequest('/github/scan', { jobs: schema.jobs }, 'POST', {});
export const listJobs = () => dispatchedRequest('/github/jobs', { jobs: schema.jobs }, 'GET', {});
