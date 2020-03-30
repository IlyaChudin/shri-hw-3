import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import settingsReducer from "./settings/reducer";

const reducers = {
  settings: settingsReducer
};
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));
