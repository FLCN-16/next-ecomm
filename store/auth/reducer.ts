import { AnyAction } from "redux"
import { Map } from "immutable"

import { LOADING_START, LOADING_STOP, AUTH_ACCOUNT_SUCCESS, AUTH_ACCOUNT_FAILED } from './action'


const initialState = Map({
  loading: false,
  isAuthenticated: false,
  account: null,
})

export default function authReducer(state = initialState, action: AnyAction) {
  switch( action.type ) {
    case LOADING_START:
      return state.set('loading', true);
    case LOADING_STOP:
      return state.set('loading', false);
    case AUTH_ACCOUNT_SUCCESS:
      state.set('isAuthenticated', true);
      state.set('account', action.payload);
      return state.set('loading', false);
    case AUTH_ACCOUNT_FAILED:
      state.set('isAuthenticated', false);
      state.set('account', null);
      return state.set('loading', false);
    default:
      return state
  }
}