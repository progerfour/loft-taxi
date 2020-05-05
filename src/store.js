import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { authFetchMiddleware } from "./modules/auth";
import rootReducer, { rootSaga } from "./modules";

const sagaMiddleware = createSagaMiddleware();

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(authFetchMiddleware),
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (noop) => noop
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createAppStore;
