import { AnyAction } from "redux"
import { Map } from "immutable"
import type { ImmutableMap } from "../../lib/types/common"

import {
  LOADING_START,
  LOADING_STOP,
  AUTH_ACCOUNT_SUCCESS,
  AUTH_ACCOUNT_FAILED,
  VALIDATE_SESSION_SUCCESS,
  VALIDATE_SESSION_FAILURE,
  AUTH_ACCOUNT_LOGGEDOUT,
} from "./action"

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
  switch (action.type) {
    case LOADING_START:
      return state.set("loading", true)
    case LOADING_STOP:
      return state.set("loading", false)
    case AUTH_ACCOUNT_SUCCESS:
    case VALIDATE_SESSION_SUCCESS:
      // Assigning jwt auth token to global variable for easy access across application
      global.authToken = action.payload.token

      state = state.set("isAuthenticated", true)
      state = state.set("account", action.payload)
      return state.set("loading", false)
    case AUTH_ACCOUNT_FAILED:
    case AUTH_ACCOUNT_LOGGEDOUT:
      // Removing auth token from global variable
      global.authToken = null

      state = state.set("isAuthenticated", false)
      state = state.set("account", null)
      return state.set("loading", false)
    default:
      return state
  }
}
