import {
  GET_BUILDS_FAILURE,
  GET_BUILDS_SUCCESS,
  RUN_BUILD_SUCCESS,
  RUN_BUILD_FAILURE,
  CLEAR_BUILDS,
  GET_BUILDS_LOADING
} from "./types";

const initialState = {
  builds: [],
  getError: null,
  runBuildError: null,
  showMore: true,
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUILDS_SUCCESS:
      return { ...state, builds: [...state.builds, ...action.builds], getError: null, showMore: action.showMore };
    case GET_BUILDS_FAILURE:
      return { ...state, getError: action.error };
    case GET_BUILDS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case RUN_BUILD_SUCCESS:
      return { ...state, runBuildError: null };
    case RUN_BUILD_FAILURE:
      return { ...state, runBuildError: action.error };
    case CLEAR_BUILDS:
      return initialState;
    default:
      return state;
  }
}
