import { BuildModel } from "@shri-ci/types";
import { Action } from "redux";
import { FailureAction } from "../common";

export const GET_BUILD_DETAILS_SUCCESS = "GET_BUILD_DETAILS_SUCCESS";
export const GET_BUILD_DETAILS_FAILURE = "GET_BUILD_DETAILS_FAILURE";
export const GET_BUILD_LOG_SUCCESS = "GET_BUILD_LOG_SUCCESS";
export const GET_BUILD_LOG_FAILURE = "GET_BUILD_LOG_FAILURE";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const LOG_LOADING_START = "LOG_LOADING_START";
export const LOG_LOADING_END = "LOG_LOADING_END";

export interface DetailsState {
  details: BuildModel | null;
  log: string | null;
  getDetailsError: string | null;
  getLogError: string | null;
  logLoading: boolean;
}

interface GetBuildDetailsSuccess extends Action<typeof GET_BUILD_DETAILS_SUCCESS> {
  details: BuildModel;
}

type GetBuildDetailsFailure = FailureAction<typeof GET_BUILD_DETAILS_FAILURE>;

interface GetBuildLogSuccess extends Action<typeof GET_BUILD_LOG_SUCCESS> {
  log: string | null;
}

type GetBuildLogFailure = FailureAction<typeof GET_BUILD_LOG_FAILURE>;

type ClearDetails = Action<typeof CLEAR_DETAILS>;

type LogLoadingStart = Action<typeof LOG_LOADING_START>;

type LogLoadingEnd = Action<typeof LOG_LOADING_END>;

export type DetailsActionTypes =
  | GetBuildDetailsSuccess
  | GetBuildDetailsFailure
  | GetBuildLogSuccess
  | GetBuildLogFailure
  | ClearDetails
  | LogLoadingStart
  | LogLoadingEnd;
