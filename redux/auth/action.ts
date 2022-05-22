import { Session, AuthForm } from "./types"

export const LOADING_START = "AUTH:LOADING_START"
export const LOADING_STOP = "AUTH:LOADING_STOP"
export const AUTH_ACCOUNT = "AUTH:ACCOUNT"
export const AUTH_ACCOUNT_LOGOUT = "AUTH:ACCOUNT:LOGOUT"
export const AUTH_ACCOUNT_LOGGEDOUT = "AUTH:ACCOUNT:LOGGEDOUT"
export const AUTH_ACCOUNT_SUCCESS = "AUTH:ACCOUNT_SUCCESS"
export const AUTH_ACCOUNT_FAILED = "AUTH:ACCOUNT_FAILED"
export const VALIDATE_SESSION = "AUTH:VALIDATE_SESSION"
export const VALIDATE_SESSION_SUCCESS = "AUTH:VALIDATE_SESSION_SUCCESS"
export const VALIDATE_SESSION_FAILURE = "AUTH:VALIDATE_SESSION_FAILURE"

export const startLoading = () => ({
  type: LOADING_START,
})

export const stopLoading = () => ({
  type: LOADING_STOP,
})

export const authAccount = (payload: AuthForm) => ({
  type: AUTH_ACCOUNT,
  payload,
})

export const validateSession = (session: Session) => ({
  type: VALIDATE_SESSION,
  payload: { session },
})

export const logoutAccount = () => ({
  type: AUTH_ACCOUNT_LOGOUT,
})
