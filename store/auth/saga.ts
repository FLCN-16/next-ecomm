import { LoginResponse } from '@flcn-ecomm/model/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';
import { AnyAction } from 'redux';

import {
  LOADING_START, LOADING_STOP, VALIDATE_SESSION,
  VALIDATE_SESSION_FAILURE, VALIDATE_SESSION_SUCCESS,
  AUTH_ACCOUNT, AUTH_ACCOUNT_FAILED, AUTH_ACCOUNT_SUCCESS, AUTH_ACCOUNT_LOGOUT,
  AUTH_ACCOUNT_LOGGEDOUT
} from './action'

import authModel from '@flcn-ecomm/model/auth';
import Storage from '@flcn-ecomm/lib/helper/storage';


function* authAccount(action: AnyAction) {
  yield put({ type: LOADING_START }); // Start Loading

  const {login, password, remember, redirectTo} = action.payload

  try {
    let account: LoginResponse = yield call(authModel.login, login, password, remember);

    yield put({ type: AUTH_ACCOUNT_SUCCESS, payload: account });
    yield call(Storage.set, 'account', account);

    // Redirect to target page
    yield Router.push({ pathname: redirectTo } );
  } catch (error) {
    yield put({ type: AUTH_ACCOUNT_FAILED });
    yield call(Storage.delete, 'account');
  }

  yield put({ type: LOADING_STOP }); // Stop Loading
}

function* validateSession(action: AnyAction) {
  const account: LoginResponse = yield call(Storage.get, 'account', null);
  if ( ! account ) yield put({ type: VALIDATE_SESSION_FAILURE });

  yield put({ type: LOADING_START }); // Start Loading

  try {
    const { data } = yield call(authModel.account, account.token)

    if ( ! data.me.ID ) throw new Error('Invalid Session!')

    account.firstName = data.me.firstName
    account.lastName = data.me.lastName
    account.capabilities = data.me.capabilities.map((cap: any) => cap.slug);

    yield put({ type: VALIDATE_SESSION_SUCCESS, payload: account });
  } catch(err) {
    yield put({ type: VALIDATE_SESSION_FAILURE });
  }

  yield put({ type: LOADING_STOP }); // Stop Loading
}

function* logoutAccount(action: AnyAction) {
  const account: LoginResponse = yield call(Storage.get, 'account', null);
  if ( account ) {

  }

  yield call(Storage.delete, 'account'); // Delete Session from local database

  yield put({ type: AUTH_ACCOUNT_LOGGEDOUT });

  // Redirect to target page
  yield Router.push({ pathname: '/admin/auth' });
}


export default function* appSaga() {
  yield takeLatest(AUTH_ACCOUNT, authAccount);
  yield takeLatest(VALIDATE_SESSION, validateSession);
  yield takeLatest(AUTH_ACCOUNT_LOGOUT, logoutAccount);
};