import {
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
  SAVE_SETTINGS_START,
  SAVE_SETTINGS_END,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILURE,
  CLEAR_SAVE_ERROR
} from "./types";

const initialState = {
  repoName: "",
  buildCommand: "",
  mainBranch: "",
  period: "",
  isLoaded: false,
  isSaving: false,
  saveError: null,
  getError: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SETTINGS_SUCCESS:
      return { ...state, ...action.settings, isLoaded: true, getError: null };
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
      return { ...state, saveError: null };
    default:
      return state;
  }
}
