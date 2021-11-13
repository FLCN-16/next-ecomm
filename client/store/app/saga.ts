import { call, put, takeEvery } from 'redux-saga/effects'
import { AnyAction } from 'redux';

import {
  INITIALIZE, LOADING_START, LOADING_STOP,
  VALIDATE_SESSION, VALIDATE_SESSION_FAILURE,
  VALIDATE_SESSION_SUCCESS
} from './action'


function* initializeApp(action: AnyAction) {
  yield put({ type: LOADING_START }); // Start Loading

  yield put({ type: VALIDATE_SESSION }); // Validate Session

  yield put({ type: LOADING_STOP }); // Stop Loading
}

function* validateSession(action: AnyAction) {
  const session = false

  if ( session ) {
    yield put({ type: VALIDATE_SESSION_SUCCESS });
  } else {
    yield put({ type: VALIDATE_SESSION_FAILURE });
  }
}


export default function* appSaga() {
  yield takeEvery(INITIALIZE, initializeApp);
  yield takeEvery(VALIDATE_SESSION, validateSession);
};