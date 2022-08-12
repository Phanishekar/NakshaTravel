import { createStore, applyMiddleware, compose } from "redux";
import createDebounce from "redux-debounced";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/rootReducer";

const middlewares = [thunk, createDebounce()];

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const logger = createLogger();
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares, logger))
);

export { store };
