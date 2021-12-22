import { AnyAction } from "redux"
import { Map } from "immutable"

const initialState = Map({
  ready: false,
  locale: 'en'
})

export default function appReducer(state = initialState, action: AnyAction) {
  switch( action.type ) {
    default:
      return state
  }
}