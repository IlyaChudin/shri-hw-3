import axios from "axios";
import { GET_BUILDS_FAILURE, GET_BUILDS_SUCCESS } from "./types";

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

// eslint-disable-next-line import/prefer-default-export
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
