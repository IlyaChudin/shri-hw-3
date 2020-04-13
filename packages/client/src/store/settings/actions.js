import axios from "axios";
import {
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
  SAVE_SETTINGS_START,
  SAVE_SETTINGS_END,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILURE,
  CLEAR_SAVE_ERROR
} from "./types";

function getSettingsSuccess(settings) {
  return {
    type: GET_SETTINGS_SUCCESS,
    settings
  };
}

function getSettingsFailure(error) {
  return {
    type: GET_SETTINGS_FAILURE,
    error
  };
}

function saveSettingsStart() {
  return {
    type: SAVE_SETTINGS_START
  };
}

function saveSettingsEnd() {
  return {
    type: SAVE_SETTINGS_END
  };
}

function saveSettingsSuccess(settings) {
  return {
    type: SAVE_SETTINGS_SUCCESS,
    settings
  };
}

function saveSettingsFailure(error) {
  return {
    type: SAVE_SETTINGS_FAILURE,
    error
  };
}

export function clearSaveError() {
  return {
    type: CLEAR_SAVE_ERROR
  };
}

export function getSettings() {
  return async dispatch => {
    try {
      const { data } = await axios.get("/api/settings");
      dispatch(getSettingsSuccess(data));
    } catch (e) {
      dispatch(getSettingsFailure(e.message));
    }
  };
}

export function saveSettings(settings, history) {
  return async dispatch => {
    try {
      dispatch(saveSettingsStart());
      dispatch(clearSaveError());
      await axios.post("/api/settings", settings);
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
