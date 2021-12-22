import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { AnyAction } from 'redux';

import {
  LOADING_START, LOADING_STOP, VALIDATE_SESSION,
  VALIDATE_SESSION_FAILURE, VALIDATE_SESSION_SUCCESS,
  AUTH_ACCOUNT, AUTH_ACCOUNT_FAILED, AUTH_ACCOUNT_SUCCESS
} from './action'

import authModel from '@flcn-ecomm/model/auth';


function* authAccount(action: AnyAction) {
  yield put({ type: LOADING_START }); // Start Loading

  const {login, password, remember} = action.payload

  const session = yield call(authModel.login, login, password, remember);

  if ( session.statusText === 'status' && session.data.status === true ) {
    yield put({ type: VALIDATE_SESSION_SUCCESS, payload: session.data });
  } else {
    yield put({ type: VALIDATE_SESSION_FAILURE });
  }

  yield put({ type: LOADING_STOP }); // Stop Loading
}

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
  yield takeLatest(AUTH_ACCOUNT, authAccount);
  yield takeLatest(VALIDATE_SESSION, validateSession);
};