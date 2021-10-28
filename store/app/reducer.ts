import { AnyAction } from "redux"

const initialState = {
  ready: false,
  locale: 'en'
}

export default function appReducer(state = initialState, action: AnyAction) {
  switch( action.type ) {
    default:
      return state
  }
}