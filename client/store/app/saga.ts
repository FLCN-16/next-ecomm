import { call, put, takeEvery } from 'redux-saga/effects'
import { AnyAction } from 'redux';

import {
  INITIALIZE, LOADING_START, LOADING_STOP
} from './action'
import { VALIDATE_SESSION } from '../auth/action'


function* initializeApp(action: AnyAction) {
  yield put({ type: LOADING_START }); // Start Loading

  yield put({ type: VALIDATE_SESSION }); // Validate Session

  yield put({ type: LOADING_STOP }); // Stop Loading
}


export default function* appSaga() {
  yield takeEvery(INITIALIZE, initializeApp);
};