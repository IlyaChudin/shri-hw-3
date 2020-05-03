import { Action } from "redux";
import { ConfigurationInput, ConfigurationModel } from "@shri-ci/types";
import { FailureAction } from "../common";

export const GET_SETTINGS_SUCCESS = "GET_SETTINGS_SUCCESS";
export const GET_SETTINGS_FAILURE = "GET_SETTINGS_FAILURE";
export const SAVE_SETTINGS_START = "SAVE_SETTINGS_START";
export const SAVE_SETTINGS_END = "SAVE_SETTINGS_END";
export const SAVE_SETTINGS_SUCCESS = "SAVE_SETTINGS_SUCCESS";
export const SAVE_SETTINGS_FAILURE = "SAVE_SETTINGS_FAILURE";
export const CLEAR_SAVE_ERROR = "CLEAR_SAVE_ERROR";

export interface SettingsState extends ConfigurationModel {
  isLoaded: boolean;
  isSaving: boolean;
  saveError?: string;
  getError?: string;
}

interface GetSettingsSuccess extends Action<typeof GET_SETTINGS_SUCCESS> {
  settings: ConfigurationModel;
}

type GetSettingsFailure = FailureAction<typeof GET_SETTINGS_FAILURE>;

type SaveSettingsStart = Action<typeof SAVE_SETTINGS_START>;

type SaveSettingsEnd = Action<typeof SAVE_SETTINGS_END>;

interface SaveSettingsSuccess extends Action<typeof SAVE_SETTINGS_SUCCESS> {
  settings: ConfigurationInput;
}

type SaveSettingsFailure = FailureAction<typeof SAVE_SETTINGS_FAILURE>;

type ClearSaveError = Action<typeof CLEAR_SAVE_ERROR>;

export type SettingsActionTypes =
  | GetSettingsSuccess
  | GetSettingsFailure
  | SaveSettingsStart
  | SaveSettingsEnd
  | SaveSettingsSuccess
  | SaveSettingsFailure
  | ClearSaveError;
