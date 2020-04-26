import {
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
  SAVE_SETTINGS_START,
  SAVE_SETTINGS_END,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILURE,
  CLEAR_SAVE_ERROR,
  SettingsState,
  SettingsActionTypes
} from "./types";

const initialState: SettingsState = {
  id: "",
  repoName: "",
  buildCommand: "",
  mainBranch: "",
  period: 0,
  isLoaded: false,
  isSaving: false,
  saveError: undefined,
  getError: undefined
};

export default (state = initialState, action: SettingsActionTypes): SettingsState => {
  switch (action.type) {
    case GET_SETTINGS_SUCCESS:
      return { ...state, ...action.settings, isLoaded: true, getError: undefined };
    case GET_SETTINGS_FAILURE:
      return { ...state, isLoaded: false, getError: action.error };
    case SAVE_SETTINGS_START:
      return { ...state, isSaving: true };
    case SAVE_SETTINGS_END:
      return { ...state, isSaving: false };
    case SAVE_SETTINGS_SUCCESS:
      return { ...state, ...action.settings, isLoaded: true };
    case SAVE_SETTINGS_FAILURE:
      return { ...state, saveError: action.error };
    case CLEAR_SAVE_ERROR:
      return { ...state, saveError: undefined };
    default:
      return state;
  }
};
