import { call, put, takeEvery } from 'redux-saga/effects'
import { AnyAction } from 'redux';

import {
  LOADING_START, LOADING_STOP, VALIDATE_SESSION,
  VALIDATE_SESSION_FAILURE, VALIDATE_SESSION_SUCCESS
} from './action'


function* validateSession(action: AnyAction) {
  const session = false

  yield put({ type: LOADING_START }); // Start Loading

  if ( session ) {
    yield put({ type: VALIDATE_SESSION_SUCCESS });
  } else {
    yield put({ type: VALIDATE_SESSION_FAILURE });
  }

  yield put({ type: LOADING_STOP }); // Stop Loading
}


export default function* appSaga() {
  yield takeEvery(VALIDATE_SESSION, validateSession);
};