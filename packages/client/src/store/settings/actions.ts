import axios from "axios";
import { ConfigurationInput, ConfigurationModel } from "@shri-ci/types";
import { History } from "history";
import { ThunkAction } from "redux-thunk";
import {
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
  SAVE_SETTINGS_START,
  SAVE_SETTINGS_END,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILURE,
  CLEAR_SAVE_ERROR,
  SettingsActionTypes,
  SettingsState
} from "./types";

const getSettingsSuccess = (settings: ConfigurationModel): SettingsActionTypes => ({
  type: GET_SETTINGS_SUCCESS,
  settings
});

const getSettingsFailure = (error: string): SettingsActionTypes => ({
  type: GET_SETTINGS_FAILURE,
  error
});

const saveSettingsStart = (): SettingsActionTypes => ({
  type: SAVE_SETTINGS_START
});

const saveSettingsEnd = (): SettingsActionTypes => ({
  type: SAVE_SETTINGS_END
});

const saveSettingsSuccess = (settings: ConfigurationInput): SettingsActionTypes => ({
  type: SAVE_SETTINGS_SUCCESS,
  settings
});

const saveSettingsFailure = (error: string): SettingsActionTypes => ({
  type: SAVE_SETTINGS_FAILURE,
  error
});

export const clearSaveError = (): SettingsActionTypes => ({
  type: CLEAR_SAVE_ERROR
});

type SettingsThunkResult<R = void> = ThunkAction<R | Promise<R>, SettingsState, unknown, SettingsActionTypes>;

export function getSettings(): SettingsThunkResult {
  return async (dispatch): Promise<void> => {
    try {
      const { data } = await axios.get<ConfigurationModel>("/api/settings");
      dispatch(getSettingsSuccess(data));
    } catch (e) {
      dispatch(getSettingsFailure(e.message));
    }
  };
}

export function saveSettings(settings: ConfigurationInput, history: History): SettingsThunkResult {
  return async (dispatch): Promise<void> => {
    try {
      dispatch(saveSettingsStart());
      dispatch(clearSaveError());
      await axios.post<ConfigurationInput>("/api/settings", settings);
      dispatch(saveSettingsSuccess(settings));
      history.push("/");
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        dispatch(saveSettingsFailure(e.response.data.error.message));
      } else {
        dispatch(saveSettingsFailure(e.message));
      }
    } finally {
      dispatch(saveSettingsEnd());
    }
  };
}
