import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import settingsReducer from "./settings/reducer";
import buildsReducer from "./builds/reducer";
import detailsReducer from "./details/reducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
  builds: buildsReducer,
  details: detailsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default (initialState: Partial<RootState> = {}): Store<RootState> =>
  createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
