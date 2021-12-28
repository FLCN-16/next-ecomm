import { all } from 'redux-saga/effects'

import appSaga from './app/saga'
import authSaga from './auth/saga'


export default function* rootSaga() {
  yield all([
    appSaga(),
    authSaga()
  ])
}