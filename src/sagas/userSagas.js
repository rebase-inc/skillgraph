import { fork, put, delay, takeEvery } from 'redux-saga/effects'
import { dispatchedRequest } from '../utils/api';

import { RESTORE_AUTH, LOGIN, LOGOUT, SCAN, GET_SCAN_STATUS } from '../constants/actionTypes';

function* restoreAuth() {
  yield delay(1000);
  yield put({ type: 'whatever' });
}

function* login() {
  console.log("doing some login");
}

function* watchRestoreAuth() {
  yield takeEvery(RESTORE_AUTH, restoreAuth)
}

function* watchLogin() {
  yield takeEvery(LOGIN, login)
}

export default function* userSagas() {
  yield [ fork(restoreAuth), fork(watchRestoreAuth) ];
}
