import { AnyAction } from "redux"
import { Map } from "immutable"
import type { ImmutableMap } from "@flcn-ecomm/lib/types/common"

export type AppState = ImmutableMap<{
  ready: boolean;
  locale: string;
}>

const initialState: AppState = Map({
  ready: false,
  locale: 'en'
})

export default function appReducer(state = initialState, action: AnyAction) {
  switch( action.type ) {
    default:
      return state
  }
}