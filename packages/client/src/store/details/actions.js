import axios from "axios";
import {
  GET_BUILD_DETAILS_SUCCESS,
  GET_BUILD_DETAILS_FAILURE,
  GET_BUILD_LOG_SUCCESS,
  GET_BUILD_LOG_FAILURE,
  CLEAR_DETAILS
} from "./types";

function getBuildDetailsSuccess(details) {
  return {
    type: GET_BUILD_DETAILS_SUCCESS,
    details
  };
}

function getBuildDetailsFailure(error) {
  return {
    type: GET_BUILD_DETAILS_FAILURE,
    error
  };
}

function getBuildLogSuccess(log) {
  return {
    type: GET_BUILD_LOG_SUCCESS,
    log
  };
}

function getBuildLogFailure(error) {
  return {
    type: GET_BUILD_LOG_FAILURE,
    error
  };
}

export function clearDetails() {
  return {
    type: CLEAR_DETAILS
  };
}

export function getDetails(buildId) {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/builds/${buildId}`);
      dispatch(getBuildDetailsSuccess(data));
    } catch (e) {
      if (e.response && e.response.status === 400) {
        dispatch(getBuildDetailsFailure("Invalid build number"));
      } else {
        dispatch(getBuildDetailsFailure("Build not found"));
      }
    }
  };
}

export function getLog(buildId) {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/builds/${buildId}/logs`);
      dispatch(getBuildLogSuccess(data));
    } catch (e) {
      if (e.response && e.response.status === 400) {
        dispatch(getBuildLogFailure("Invalid build number"));
      } else {
        dispatch(getBuildLogFailure("Build not found"));
      }
    }
  };
}
