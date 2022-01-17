import { combineReducers } from "redux"

import appReducer from "./app/reducer"
import authReducer from "./auth/reducer"

export interface RootState {
  app: ReturnType<typeof appReducer>
  auth: ReturnType<typeof authReducer>
}

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export default rootReducer
