import axios from "axios";
import {
  GET_BUILDS_SUCCESS,
  GET_BUILDS_FAILURE,
  RUN_BUILD_SUCCESS,
  RUN_BUILD_FAILURE,
  CLEAR_BUILDS,
  GET_BUILDS_LOADING
} from "./types";

export function getBuildsSuccess(builds, showMore) {
  return {
    type: GET_BUILDS_SUCCESS,
    builds,
    showMore
  };
}

export function getBuildsFailure(error) {
  return {
    type: GET_BUILDS_FAILURE,
    error
  };
}

export function runBuildSuccess() {
  return {
    type: RUN_BUILD_SUCCESS
  };
}

export function runBuildFailure(error) {
  return {
    type: RUN_BUILD_FAILURE,
    error
  };
}

export function clearBuilds() {
  return {
    type: CLEAR_BUILDS
  };
}

export function getBuildsLoading(isLoading) {
  return {
    type: GET_BUILDS_LOADING,
    isLoading
  };
}

export function getBuilds(offset, limit = 10) {
  return async dispatch => {
    try {
      dispatch(getBuildsLoading(true));
      const { data } = await axios.get("/api/builds", { params: { offset, limit } });
      dispatch(getBuildsSuccess(data, data.length >= limit));
    } catch (e) {
      dispatch(getBuildsFailure(e.message));
    } finally {
      dispatch(getBuildsLoading(false));
    }
  };
}

export function runBuild(commitHash, branchName, history) {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/builds/${commitHash}`, { params: { branchName } });
      dispatch(runBuildSuccess());
      history.push(`/build/${data.id}`);
      dispatch(clearBuilds());
    } catch (e) {
      dispatch(runBuildFailure(e.message));
    }
  };
}
