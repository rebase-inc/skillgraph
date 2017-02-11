import { dispatchedRequest } from '../utils/api';

//import { RESTORE_AUTH, LOGIN, LOGOUT, SCAN, GET_SCAN_STATUS } from '../constants/actionTypes';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const RESTORE_STATE = 'RESTORE_STATE';
export const START_SCAN = 'START_SCAN';
export const LIST_JOBS = 'LIST_JOBS';
export const START_JOB_MONITOR = 'START_JOB_MONITOR';
export const STOP_JOB_MONITOR = 'STOP_JOB_MONITOR';
export const LOGOUT = 'LOGOUT';

function makeRequestTypes(name) {
  return [REQUEST, SUCCESS, FAILURE].reduce((requests, type) => {
    requests[type] = `${name}_${type}`;
    return requests;
  }, {});
}

function action(type, payload = {}) {
  return { type, ...payload };
}

export const AUTH = makeRequestTypes('AUTH');
export const SCAN = makeRequestTypes('SCAN');
export const JOBS = makeRequestTypes('JOBS');

export const auth = {
  request: () => action(AUTH.REQUEST),
  success: (response) => action(AUTH.SUCCESS, { response }),
  failure: (error) => action(AUTH.FAILURE, { error })
}

export const scan = {
  request: () => action(SCAN.REQUEST),
  success: (response) => action(SCAN.SUCCESS, { response }),
  failure: (error) => action(SCAN.FAILURE, { error })
}

export const jobs = {
  request: () => action(JOBS.REQUEST),
  success: (response) => action(JOBS.SUCCESS, { response }),
  failure: (error) => action(JOBS.FAILURE, { error })
}

export const restoreState = () => action(RESTORE_STATE);
export const startScan = () => action(START_SCAN);
export const listJobs = () => action(LIST_JOBS);
export const logout = () => action(LOGOUT);
export const startJobMonitor = () => action(START_JOB_MONITOR);
export const stopJobMonitor = () => action(STOP_JOB_MONITOR);
