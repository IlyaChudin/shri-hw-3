import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import settingsReducer from "./settings/reducer";
import buildsReducer from "./builds/reducer";
import detailsReducer from "./details/reducer";

const reducers = {
  settings: settingsReducer,
  builds: buildsReducer,
  details: detailsReducer
};
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default initialState =>
  createStore(combineReducers(reducers), initialState, composeEnhancers(applyMiddleware(thunk)));
