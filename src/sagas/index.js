import { delay } from 'redux-saga'
import { cancelled, cancel, fork, put, call, take, takeEvery, takeLatest } from 'redux-saga/effects'
import * as api from '../utils/api';
import * as actions from '../actions';

function* modifyRemoteEntity(entity, apiCall, options = { sideEffect: () => undefined })  {
  yield put(entity.request())
  const {response, error} = yield call(apiCall)
  if(response) {
    yield put( entity.success(response) )
    let sideEffect = options.sideEffect(response);
    if (!!sideEffect) {
      yield put(sideEffect);
    }
  } else {
    yield put( entity.failure(error) )
  }
}

function* repeatAction(handler, delayPeriod = 1000) {
  try {
    while (true) {
      console.log('going to call handler', handler);
      yield call(handler);
      yield call(delay, delayPeriod);
    }
  } finally {
    if (yield cancelled()) {
      console.log('Poll cancelled');
    } else {
      console.log('wtf happened?');
    }
  }
}

function* watch(action, effect) {
  function* combined(effects) {
    yield effects.map(e => call(e))
  }
  if (Array.isArray(effect)) {
    yield takeLatest(action, combined(effect));
  } else {
    yield takeLatest(action, effect);
  }
}

function* watchAndPoll(startAction, stopAction, handler, delayPeriod = 1000) {
  while (true) {
    const { payload } = yield take(startAction);
    const watcherInstance = yield fork(repeatAction.bind(null, handler, delayPeriod));
    // cancel task instance on location change
    yield take(stopAction);
    yield cancel(watcherInstance);
  }
}

// Handlers
export const logout = modifyRemoteEntity.bind(null, actions.auth, api.logout);
export const loadAuth = modifyRemoteEntity.bind(null, actions.auth, api.fetchAuth, { sideEffect: (response) => ({ type: actions.START_JOB_MONITOR }) });
export const startScan = modifyRemoteEntity.bind(null, actions.scan, api.startScan, { sideEffect: (response) => ({ type: actions.START_JOB_MONITOR }) });
export const listJobs = modifyRemoteEntity.bind(null, actions.jobs, api.listJobs, {
  sideEffect: (response) => response.result.jobs && response.result.jobs.length == 0 ? { type: actions.STOP_JOB_MONITOR } : undefined,
});

// Watchers
export const watchRestoreState = watch.bind(null, actions.RESTORE_STATE, loadAuth);
export const watchLogout = watch.bind(null, actions.LOGOUT, logout);
export const watchStartScan = watch.bind(null, actions.START_SCAN, startScan);
export const watchListJobs = watch.bind(null, actions.LIST_JOBS, listJobs);
export const watchStartJobMonitor = watchAndPoll.bind(null, actions.START_JOB_MONITOR, actions.STOP_JOB_MONITOR, listJobs);

export default function* rootSaga() {
  yield [ watchRestoreState(), watchStartScan(), watchStartJobMonitor(), watchListJobs(), watchLogout() ];
}
