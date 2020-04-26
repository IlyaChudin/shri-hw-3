import { BuildModel, BuildStatus } from "@shri-ci/types";
import reducer from "./reducer";
import {
  clearBuilds,
  getBuildsFailure,
  getBuildsLoading,
  getBuildsSuccess,
  runBuildFailure,
  runBuildSuccess
} from "./actions";
import { BuildsState } from "./types";

describe("builds reducer", () => {
  const initialState: BuildsState = {
    builds: [],
    getError: undefined,
    runBuildError: undefined,
    showMore: true,
    isLoading: false
  };
  it("should reduce GET_BUILDS_SUCCESS action", () => {
    const builds: BuildModel[] = [
      {
        id: "f7981650-50c6-4eb2-a357-f112910a3eb7",
        configurationId: "952b0cf1-948a-4f95-b6ce-ee225d36c24c",
        buildNumber: 37,
        commitMessage: "test update",
        commitHash: "0cab04f6b0894e775e66224469fde0309f8eb284",
        branchName: "master",
        authorName: "Ilya Chudin",
        status: BuildStatus.Waiting
      },
      {
        id: "01d78ffb-dae2-4bb9-9457-233fc8700c7e",
        configurationId: "952b0cf1-948a-4f95-b6ce-ee225d36c24c",
        buildNumber: 36,
        commitMessage: "test update",
        commitHash: "0cab04f6b0894e775e66224469fde0309f8eb284",
        branchName: "master",
        authorName: "Ilya Chudin",
        status: BuildStatus.Success,
        start: new Date("2020-04-04T08:32:53.442"),
        duration: 2375
      }
    ];
    const action = getBuildsSuccess(builds, true);

    const expected: BuildsState = { ...initialState, builds, showMore: true };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it("should reduce GET_BUILDS_FAILURE action", () => {
    const action = getBuildsFailure("error");
    const expected: BuildsState = { ...initialState, getError: "error" };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it("should reduce GET_BUILDS_LOADING action", () => {
    const action = getBuildsLoading(true);
    const expected: BuildsState = { ...initialState, isLoading: true };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it("should reduce RUN_BUILD_SUCCESS action", () => {
    const action = runBuildSuccess();
    const expected: BuildsState = { ...initialState, runBuildError: undefined };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it("should reduce RUN_BUILD_FAILURE action", () => {
    const action = runBuildFailure("error");
    const expected: BuildsState = { ...initialState, runBuildError: "error" };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it("should reduce CLEAR_BUILDS action", () => {
    const action = clearBuilds();

    const state = reducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
