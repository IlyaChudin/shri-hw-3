import axios from "axios";
import { GET_BUILDS_SUCCESS, GET_BUILDS_FAILURE, RUN_BUILD_SUCCESS, RUN_BUILD_FAILURE } from "./types";

function getBuildsSuccess(builds, showMore) {
  return {
    type: GET_BUILDS_SUCCESS,
    builds,
    showMore
  };
}

function getBuildsFailure(error) {
  return {
    type: GET_BUILDS_FAILURE,
    error
  };
}

function runBuildsSuccess() {
  return {
    type: RUN_BUILD_SUCCESS
  };
}

function runBuildsFailure(error) {
  return {
    type: RUN_BUILD_FAILURE,
    error
  };
}

export function getBuilds(offset, limit = 10) {
  return async dispatch => {
    try {
      const { data } = await axios.get("/api/builds", { params: { offset, limit } });
      dispatch(getBuildsSuccess(data, data.length >= limit));
    } catch (e) {
      dispatch(getBuildsFailure(e.message));
    }
  };
}

export function runBuild(commitHash, branchName, history) {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/builds/${commitHash}`, { params: { branchName } });
      dispatch(runBuildsSuccess());
      history.push(`/build/${data.id}`);
    } catch (e) {
      dispatch(runBuildsFailure(e.message));
    }
  };
}
