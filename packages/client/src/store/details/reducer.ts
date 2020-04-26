import {
  GET_BUILD_DETAILS_SUCCESS,
  GET_BUILD_DETAILS_FAILURE,
  GET_BUILD_LOG_SUCCESS,
  GET_BUILD_LOG_FAILURE,
  CLEAR_DETAILS,
  LOG_LOADING_START,
  LOG_LOADING_END,
  DetailsState,
  DetailsActionTypes
} from "./types";

const initialState: DetailsState = {
  details: null,
  log: "",
  getDetailsError: null,
  getLogError: null,
  logLoading: false
};

export default (state = initialState, action: DetailsActionTypes): DetailsState => {
  switch (action.type) {
    case GET_BUILD_DETAILS_SUCCESS:
      return { ...state, details: action.details, getDetailsError: null };
    case GET_BUILD_DETAILS_FAILURE:
      return { ...state, details: null, getDetailsError: action.error };
    case GET_BUILD_LOG_SUCCESS:
      return { ...state, log: action.log, getLogError: null };
    case GET_BUILD_LOG_FAILURE:
      return { ...state, log: null, getLogError: action.error };
    case CLEAR_DETAILS:
      return initialState;
    case LOG_LOADING_START:
      return { ...state, logLoading: true };
    case LOG_LOADING_END:
      return { ...state, logLoading: false };
    default:
      return state;
  }
};
