import { AnyAction } from "redux"
import { Map } from "immutable"
import type { ImmutableMap } from "../../lib/types/common"

import { INITIALIZE, INITIALIZED } from "./action"

export type AppState = ImmutableMap<{
  ready: boolean
  locale: string
}>

const initialState: AppState = Map({
  ready: false,
  locale: "en",
})

export default function appReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case INITIALIZE:
      return state.set("ready", false)
    case INITIALIZED:
      return state.set("ready", true)
    default:
      return state
  }
}
