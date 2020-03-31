import {
  GET_BUILD_DETAILS_SUCCESS,
  GET_BUILD_DETAILS_FAILURE,
  GET_BUILD_LOG_SUCCESS,
  GET_BUILD_LOG_FAILURE,
  CLEAR_DETAILS
} from "./types";

const initialState = {
  details: {},
  log: "",
  getDetailsError: null,
  getLogError: null
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
    default:
      return state;
  }
}
