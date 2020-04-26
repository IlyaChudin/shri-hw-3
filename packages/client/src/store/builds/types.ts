import { BuildModel } from "@shri-ci/types";
import { Action } from "redux";

export const GET_BUILDS_SUCCESS = "GET_BUILDS_SUCCESS";
export const GET_BUILDS_FAILURE = "GET_BUILDS_FAILURE";
export const GET_BUILDS_LOADING = "GET_BUILDS_LOADING";
export const RUN_BUILD_SUCCESS = "RUN_BUILD_SUCCESS";
export const RUN_BUILD_FAILURE = "RUN_BUILD_FAILURE";
export const CLEAR_BUILDS = "CLEAR_BUILDS";

export interface BuildsState {
  builds: BuildModel[];
  getError: string | null;
  runBuildError: string | null;
  showMore: boolean;
  isLoading: boolean;
}

interface FailureAction<T> extends Action<T> {
  error: string;
}

interface GetBuildsSuccess extends Action<typeof GET_BUILDS_SUCCESS> {
  builds: BuildModel[];
  showMore: boolean;
}

type GetBuildsFailure = FailureAction<typeof GET_BUILDS_FAILURE>;

type RunBuildSuccess = Action<typeof RUN_BUILD_SUCCESS>;

type RunBuildFailure = FailureAction<typeof RUN_BUILD_FAILURE>;

type ClearBuilds = Action<typeof CLEAR_BUILDS>;

interface GetBuildsLoading extends Action<typeof GET_BUILDS_LOADING> {
  isLoading: boolean;
}

export type BuildsActionTypes =
  | GetBuildsSuccess
  | GetBuildsFailure
  | GetBuildsLoading
  | RunBuildSuccess
  | RunBuildFailure
  | ClearBuilds;
