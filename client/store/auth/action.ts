import { Session } from "./types"


export const LOADING_START = 'AUTH:LOADING_START'
export const LOADING_STOP = 'AUTH:LOADING_STOP'
export const VALIDATE_SESSION = 'AUTH:VALIDATE_SESSION'
export const VALIDATE_SESSION_SUCCESS = 'AUTH:VALIDATE_SESSION_SUCCESS'
export const VALIDATE_SESSION_FAILURE = 'AUTH:VALIDATE_SESSION_FAILURE'


export const startLoading = () => ({
  type: LOADING_START
})

export const stopLoading = () => ({
  type: LOADING_STOP
})

export const validateSession = (session: Session) => ({
  type: VALIDATE_SESSION,
  payload: { session }
})