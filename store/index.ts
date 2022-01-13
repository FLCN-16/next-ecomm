import { createStore, applyMiddleware, Store, StoreEnhancer } from "redux"
import { createWrapper } from "next-redux-wrapper"
import createSagaMiddleware, { SagaMiddleware } from "redux-saga"
import { composeWithDevTools } from "@redux-devtools/extension"

import rootReducer from "./rootReducer"
import rootSaga from "./rootSaga"

const initialState = {}
const is_producation = process.env.NODE_ENV !== "development"

// create a makeStore function
const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  // Middlewares
  const middlewares: SagaMiddleware[] = []

  middlewares.push(sagaMiddleware)

  // create Enhancer from Middlewares
  let storeEnhancer: StoreEnhancer = applyMiddleware(...middlewares)
  if (!is_producation) {
    storeEnhancer = composeWithDevTools(storeEnhancer)
  }

  // Create store
  const store: Store = createStore(rootReducer, initialState, storeEnhancer)

  sagaMiddleware.run(rootSaga)

  return store
}

// export an assembled wrapper
const wrapper_config = { debug: false }
export const wrapper = createWrapper<Store>(makeStore, wrapper_config)
