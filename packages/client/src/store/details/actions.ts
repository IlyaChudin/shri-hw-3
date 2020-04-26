import axios from "axios";
import { BuildModel } from "@shri-ci/types";
import { ThunkAction } from "redux-thunk";
import {
  GET_BUILD_DETAILS_SUCCESS,
  GET_BUILD_DETAILS_FAILURE,
  GET_BUILD_LOG_SUCCESS,
  GET_BUILD_LOG_FAILURE,
  CLEAR_DETAILS,
  LOG_LOADING_START,
  LOG_LOADING_END,
  DetailsActionTypes,
  DetailsState
} from "./types";

const getBuildDetailsSuccess = (details: BuildModel): DetailsActionTypes => ({
  type: GET_BUILD_DETAILS_SUCCESS,
  details
});

const getBuildDetailsFailure = (error: string): DetailsActionTypes => ({
  type: GET_BUILD_DETAILS_FAILURE,
  error
});

const getBuildLogSuccess = (log: string): DetailsActionTypes => ({
  type: GET_BUILD_LOG_SUCCESS,
  log
});

const getBuildLogFailure = (error: string): DetailsActionTypes => ({
  type: GET_BUILD_LOG_FAILURE,
  error
});

export const clearDetails = (): DetailsActionTypes => ({
  type: CLEAR_DETAILS
});

const logLoadingStart = (): DetailsActionTypes => ({
  type: LOG_LOADING_START
});

const logLoadingEnd = (): DetailsActionTypes => ({
  type: LOG_LOADING_END
});

type DetailsThunkResult<R = void> = ThunkAction<R | Promise<R>, DetailsState, unknown, DetailsActionTypes>;

export function getDetails(buildId: string): DetailsThunkResult {
  return async (dispatch): Promise<void> => {
    try {
      const { data } = await axios.get<BuildModel>(`/api/builds/${buildId}`);
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

export function getLog(buildId: string): DetailsThunkResult {
  return async (dispatch): Promise<void> => {
    try {
      dispatch(logLoadingStart());
      const { data } = await axios.get<string>(`/api/builds/${buildId}/logs`);
      dispatch(getBuildLogSuccess(data));
    } catch (e) {
      if (e.response && e.response.status === 400) {
        dispatch(getBuildLogFailure("Invalid build number"));
      } else {
        dispatch(getBuildLogFailure("Build not found"));
      }
    } finally {
      dispatch(logLoadingEnd());
    }
  };
}
