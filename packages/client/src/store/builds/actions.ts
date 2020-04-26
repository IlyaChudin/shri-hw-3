import axios from "axios";
import { BuildModel } from "@shri-ci/types";
import { ThunkAction } from "redux-thunk";
import { History } from "history";
import {
  GET_BUILDS_SUCCESS,
  GET_BUILDS_FAILURE,
  RUN_BUILD_SUCCESS,
  RUN_BUILD_FAILURE,
  CLEAR_BUILDS,
  GET_BUILDS_LOADING,
  BuildsActionTypes,
  BuildsState
} from "./types";

export const getBuildsSuccess = (builds: BuildModel[], showMore: boolean): BuildsActionTypes => ({
  type: GET_BUILDS_SUCCESS,
  builds,
  showMore
});

export const getBuildsFailure = (error: string): BuildsActionTypes => ({
  type: GET_BUILDS_FAILURE,
  error
});

export const runBuildSuccess = (): BuildsActionTypes => ({
  type: RUN_BUILD_SUCCESS
});

export const runBuildFailure = (error: string): BuildsActionTypes => ({
  type: RUN_BUILD_FAILURE,
  error
});

export const clearBuilds = (): BuildsActionTypes => ({
  type: CLEAR_BUILDS
});

export const getBuildsLoading = (isLoading: boolean): BuildsActionTypes => ({
  type: GET_BUILDS_LOADING,
  isLoading
});

type BuildsThunkResult<R = void> = ThunkAction<R | Promise<R>, BuildsState, unknown, BuildsActionTypes>;

export const getBuilds = (offset = 0, limit = 10): BuildsThunkResult => {
  return async (dispatch): Promise<void> => {
    try {
      dispatch(getBuildsLoading(true));
      const { data } = await axios.get<BuildModel[]>("/api/builds", { params: { offset, limit } });
      dispatch(getBuildsSuccess(data, data.length >= limit));
    } catch (e) {
      dispatch(getBuildsFailure(e.message));
    } finally {
      dispatch(getBuildsLoading(false));
    }
  };
};

export const runBuild = (commitHash: string, branchName: string, history: History): BuildsThunkResult => {
  return async (dispatch): Promise<void> => {
    try {
      const { data } = await axios.post(`/api/builds/${commitHash}`, { branchName });
      dispatch(runBuildSuccess());
      history.push(`/build/${data.id}`);
      dispatch(clearBuilds());
    } catch (e) {
      dispatch(runBuildFailure(e.message));
    }
  };
};
