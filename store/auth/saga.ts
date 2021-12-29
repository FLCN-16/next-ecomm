import { LoginResponse } from '@flcn-ecomm/model/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { AnyAction } from 'redux';

import {
  LOADING_START, LOADING_STOP, VALIDATE_SESSION,
  VALIDATE_SESSION_FAILURE, VALIDATE_SESSION_SUCCESS,
  AUTH_ACCOUNT, AUTH_ACCOUNT_FAILED, AUTH_ACCOUNT_SUCCESS
} from './action'

import authModel from '@flcn-ecomm/model/auth';
import Storage from '@flcn-ecomm/lib/helper/storage';


function* authAccount(action: AnyAction) {
  yield put({ type: LOADING_START }); // Start Loading

  const {login, password, remember, redirectTo} = action.payload

  try {
    const account: LoginResponse = yield call(authModel.login, login, password, remember);

    yield put({ type: AUTH_ACCOUNT_SUCCESS, payload: account });
    yield call(Storage.set, 'account', account);
    yield put( push( redirectTo ) );
  } catch (error) {
    yield put({ type: AUTH_ACCOUNT_FAILED });
    yield call(Storage.set, 'account', null);
  }

  yield put({ type: LOADING_STOP }); // Stop Loading
}

function* validateSession(action: AnyAction) {
  const account = yield call(Storage.get, 'account', null);

  yield put({ type: LOADING_START }); // Start Loading

  if ( account ) {
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