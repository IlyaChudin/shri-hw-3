import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { createBrowserHistory } from "history";
import { BuildModel } from "@shri-ci/types";
import {
  clearBuilds,
  getBuilds,
  getBuildsFailure,
  getBuildsLoading,
  getBuildsSuccess,
  runBuild,
  runBuildFailure,
  runBuildSuccess
} from "./actions";
import {
  BuildsActionTypes,
  BuildsState,
  CLEAR_BUILDS,
  GET_BUILDS_FAILURE,
  GET_BUILDS_SUCCESS,
  RUN_BUILD_FAILURE,
  RUN_BUILD_SUCCESS
} from "./types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockStore = configureStore<BuildsState, ThunkDispatch<BuildsState, undefined, BuildsActionTypes>>([thunk]);

describe("Builds actions", () => {
  describe("getBuilds action", () => {
    it("should dispatch GET_BUILDS_SUCCESS when builds loaded successfully", async () => {
      const store = mockStore();
      const expected = [getBuildsSuccess([], false)];
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

      await store.dispatch(getBuilds());

      expect(store.getActions().filter(x => x.type === GET_BUILDS_SUCCESS)).toEqual(expected);
    });

    it("should dispatch GET_BUILDS_SUCCESS with showMore=true when loaded number of builds", async () => {
      const store = mockStore();
      const expected = [getBuildsSuccess([{} as BuildModel], true)];
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [{} as BuildModel] }));

      await store.dispatch(getBuilds(0, 1));

      expect(store.getActions().filter(x => x.type === GET_BUILDS_SUCCESS)).toEqual(expected);
    });

    it("should dispatch GET_BUILDS_FAILURE when builds loading failed", async () => {
      const store = mockStore();
      const expected = [getBuildsFailure("error")];
      mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error("error")));

      await store.dispatch(getBuilds());

      expect(store.getActions().filter(x => x.type === GET_BUILDS_FAILURE)).toEqual(expected);
    });

    it("should dispatch GET_BUILDS_LOADING when loading start and end", async () => {
      const store = mockStore();
      const expected = [getBuildsLoading(true), getBuildsLoading(false)];
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

      await store.dispatch(getBuilds());

      const actions = store.getActions();
      expect(actions[0]).toEqual(expected[0]);
      expect(actions[actions.length - 1]).toEqual(expected[1]);
    });

    it("should make right request to api", async () => {
      const store = mockStore();
      const offset = 1;
      const limit = 2;
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

      await store.dispatch(getBuilds(offset, limit));

      expect(axios.get).toHaveBeenCalledWith("/api/builds", { params: { offset, limit } });
    });
  });

  describe("runBuild action", () => {
    const id = "f7981650-50c6-4eb2-a357-f112910a3eb7";
    const commitHash = "0cab04f6b0894e775e66224469fde0309f8eb284";
    const branchName = "master";
    const history = createBrowserHistory();

    it("should dispatch RUN_BUILD_SUCCESS when build runs successfully", async () => {
      const store = mockStore();
      const expected = [runBuildSuccess()];
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(store.getActions().filter(x => x.type === RUN_BUILD_SUCCESS)).toEqual(expected);
    });

    it("should dispatch CLEAR_BUILDS when build runs successfully", async () => {
      const store = mockStore();
      const expected = [clearBuilds()];
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(store.getActions().filter(x => x.type === CLEAR_BUILDS)).toEqual(expected);
    });

    it("should redirect to build page when build runs successfully", async () => {
      const store = mockStore();
      const push = jest.spyOn(history, "push");
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(push).toHaveBeenCalledWith(`/build/${id}`);
    });

    it("should make right request to api", async () => {
      const store = mockStore();
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(axios.post).toHaveBeenCalledWith(`/api/builds/${commitHash}`, { branchName });
    });

    it("should dispatch RUN_BUILD_FAILURE when run build fails", async () => {
      const store = mockStore();
      const expected = [runBuildFailure("error")];
      mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error("error")));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(store.getActions().filter(x => x.type === RUN_BUILD_FAILURE)).toEqual(expected);
    });
  });
});
