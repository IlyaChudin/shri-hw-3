import {
  GET_BUILD_DETAILS_SUCCESS,
  GET_BUILD_DETAILS_FAILURE,
  GET_BUILD_LOG_SUCCESS,
  GET_BUILD_LOG_FAILURE,
  CLEAR_DETAILS,
  LOG_LOADING_START,
  LOG_LOADING_END
} from "./types";

const initialState = {
  details: {},
  log: "",
  getDetailsError: null,
  getLogError: null,
  logLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUILD_DETAILS_SUCCESS:
      return { ...state, details: action.details, getDetailsError: null };
    case GET_BUILD_DETAILS_FAILURE:
      return { ...state, getDetailsError: action.error };
    case GET_BUILD_LOG_SUCCESS:
      return { ...state, log: action.log, getLogError: null };
    case GET_BUILD_LOG_FAILURE:
      return { ...state, getLogError: action.error };
    case CLEAR_DETAILS:
      return initialState;
    case LOG_LOADING_START:
      return { ...state, logLoading: true };
    case LOG_LOADING_END:
      return { ...state, logLoading: false };
    default:
      return state;
  }
}
