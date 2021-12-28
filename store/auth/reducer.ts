import { AnyAction } from "redux"
import { Map } from "immutable"
import type { ImmutableMap } from "@flcn-ecomm/lib/types/common"

import { LOADING_START, LOADING_STOP, AUTH_ACCOUNT_SUCCESS, AUTH_ACCOUNT_FAILED } from './action'


export type AuthState = ImmutableMap<{
  loading: boolean
  isAuthenticated: boolean
  account: Map<string, any>
}>

const initialState: AuthState = Map({
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
      state = state.set('isAuthenticated', true);
      state = state.set('account', action.payload);
      return state.set('loading', false);
    case AUTH_ACCOUNT_FAILED:
      state = state.set('isAuthenticated', false);
      state = state.set('account', null);
      return state.set('loading', false);
    default:
      return state
  }
}