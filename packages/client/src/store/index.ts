import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import settingsReducer from "./settings/reducer";
import buildsReducer from "./builds/reducer";
import detailsReducer from "./details/reducer";
import { BuildsState } from "./builds/types";

const reducers = {
  settings: settingsReducer,
  builds: buildsReducer,
  details: detailsReducer
};

export type AppState = {
  settings: any;
  builds: BuildsState;
  details: any;
};

export default (initialState: AppState | undefined = undefined): Store<AppState> =>
  createStore(combineReducers(reducers), initialState, composeWithDevTools(applyMiddleware(thunk)));
