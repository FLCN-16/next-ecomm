import { call, take, put, takeEvery } from "redux-saga/effects"
import { AnyAction } from "redux"

import { INITIALIZE, INITIALIZED, LOADING_START, LOADING_STOP } from "./action"
import { VALIDATE_SESSION, VALIDATE_SESSION_SUCCESS, VALIDATE_SESSION_FAILURE } from "../auth/action"

function* initializeApp(action: AnyAction) {
  yield put({ type: LOADING_START }) // Start Loading

  yield put({ type: VALIDATE_SESSION }) // Validate Session
  yield take([VALIDATE_SESSION_SUCCESS, VALIDATE_SESSION_FAILURE])

  yield put({ type: INITIALIZED }) // Initialized Application

  yield put({ type: LOADING_STOP }) // Stop Loading
}

export default function* appSaga() {
  yield takeEvery(INITIALIZE, initializeApp)
}
