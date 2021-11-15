import { AnyAction } from "redux"
import { Map } from "immutable"

import { LOADING_START, LOADING_STOP } from './action'


const initialState = Map({
  loading: false
})

export default function authReducer(state = initialState, action: AnyAction) {
  switch( action.type ) {
    case LOADING_START:
      return state.set('loading', true);
    case LOADING_STOP:
      return state.set('loading', false);
    default:
      return state
  }
}