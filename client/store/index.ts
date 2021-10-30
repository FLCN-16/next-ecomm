import { createStore, applyMiddleware, Store, StoreEnhancer } from 'redux'
import { createWrapper, Context } from 'next-redux-wrapper'
import createSagaMiddleware, { SagaMiddleware, Task } from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const initialState = {}
const is_producation = process.env.NODE_ENV !== 'development'

// create a makeStore function
const makeStore = (context: Context) => {
    let sagaMiddleware = createSagaMiddleware();

    // Middlewares
    let middlewares: SagaMiddleware[] = [];

    middlewares.push(sagaMiddleware);

    // create Enhancer from Middlewares
    let storeEnhancer: StoreEnhancer = applyMiddleware(...middlewares);
    if ( ! is_producation ) {
      let { composeWithDevTools } = require('redux-devtools-extension')
      storeEnhancer = composeWithDevTools(storeEnhancer)
    }

    // Create store
    const store: Store = createStore(rootReducer, initialState, storeEnhancer);

    sagaMiddleware.run(rootSaga);

    return store
  };

// export an assembled wrapper
const wrapper_config = {debug: false}
export const wrapper = createWrapper<Store>(makeStore, wrapper_config);