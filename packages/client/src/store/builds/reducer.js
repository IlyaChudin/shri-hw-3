import { GET_BUILDS_FAILURE, GET_BUILDS_SUCCESS } from "./types";

const initialState = {
  builds: [],
  getError: null,
  showMore: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUILDS_SUCCESS:
      return { ...state, builds: [...state.builds, ...action.builds], getError: null, showMore: action.showMore };
    case GET_BUILDS_FAILURE:
      return { ...state, getError: action.error };
    default:
      return state;
  }
}
