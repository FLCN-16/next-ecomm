import { call, put, takeEvery } from 'redux-saga/effects'
import { AnyAction } from 'redux';

import { INITIALIZE } from './action'


function* initializeApp(action: AnyAction) {
  
}


export default function* appSaga() {
  yield takeEvery(INITIALIZE, initializeApp);
};