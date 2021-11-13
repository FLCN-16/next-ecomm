import { Session } from "./types"


export const INITIALIZE = 'APP:INITIALIZE'
export const VALIDATE_SESSION = 'APP:VALIDATE_SESSION'
export const VALIDATE_SESSION_SUCCESS = 'APP:VALIDATE_SESSION_SUCCESS'
export const VALIDATE_SESSION_FAILURE = 'APP:VALIDATE_SESSION_FAILURE'
export const LOADING_START = 'APP:LOADING_START'
export const LOADING_STOP = 'APP:LOADING_STOP'



export const initialize = () => ({
  type: INITIALIZE,
})

export const validateSession = (session: Session) => ({
  type: VALIDATE_SESSION,
  payload: { session }
})