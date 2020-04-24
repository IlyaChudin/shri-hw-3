import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
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
import { CLEAR_BUILDS, GET_BUILDS_FAILURE, GET_BUILDS_SUCCESS, RUN_BUILD_FAILURE, RUN_BUILD_SUCCESS } from "./types";

jest.mock("axios");

const mockStore = configureStore([thunk]);
describe("Builds actions", () => {
  describe("getBuilds action", () => {
    it("should dispatch GET_BUILDS_SUCCESS when builds loaded successfully", async () => {
      const store = mockStore({});
      const expected = [getBuildsSuccess([], false)];
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

      await store.dispatch(getBuilds(0));

      expect(store.getActions().filter(x => x.type === GET_BUILDS_SUCCESS)).toEqual(expected);
    });

    it("should dispatch GET_BUILDS_SUCCESS with showMore=true when loaded number of builds", async () => {
      const store = mockStore({});
      const expected = [getBuildsSuccess([{}, {}], true)];
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: [{}, {}] }));

      await store.dispatch(getBuilds(0, 1));

      expect(store.getActions().filter(x => x.type === GET_BUILDS_SUCCESS)).toEqual(expected);
    });

    it("should dispatch GET_BUILDS_FAILURE when builds loading failed", async () => {
      const store = mockStore({});
      const expected = [getBuildsFailure("error")];
      axios.get.mockImplementationOnce(() => Promise.reject(new Error("error")));

      await store.dispatch(getBuilds(0));

      expect(store.getActions().filter(x => x.type === GET_BUILDS_FAILURE)).toEqual(expected);
    });

    it("should dispatch GET_BUILDS_LOADING when loading start and end", async () => {
      const store = mockStore({});
      const expected = [getBuildsLoading(true), getBuildsLoading(false)];
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

      await store.dispatch(getBuilds(0));

      const actions = store.getActions();
      expect(actions[0]).toEqual(expected[0]);
      expect(actions[actions.length - 1]).toEqual(expected[1]);
    });

    it("should make right request to api", async () => {
      const store = mockStore({});
      const offset = 1;
      const limit = 2;
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

      await store.dispatch(getBuilds(offset, limit));

      expect(axios.get).toHaveBeenCalledWith("/api/builds", { params: { offset, limit } });
    });
  });

  describe("runBuild action", () => {
    const id = "f7981650-50c6-4eb2-a357-f112910a3eb7";
    const commitHash = "0cab04f6b0894e775e66224469fde0309f8eb284";
    const branchName = "master";
    const history = {
      push: jest.fn()
    };

    it("should dispatch RUN_BUILD_SUCCESS when build runs successfully", async () => {
      const store = mockStore({});
      const expected = [runBuildSuccess()];
      axios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(store.getActions().filter(x => x.type === RUN_BUILD_SUCCESS)).toEqual(expected);
    });

    it("should dispatch CLEAR_BUILDS when build runs successfully", async () => {
      const store = mockStore({});
      const expected = [clearBuilds()];
      axios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(store.getActions().filter(x => x.type === CLEAR_BUILDS)).toEqual(expected);
    });

    it("should redirect to build page when build runs successfully", async () => {
      const store = mockStore({});
      axios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(history.push).toHaveBeenCalledWith(`/build/${id}`);
    });

    it("should make right request to api", async () => {
      const store = mockStore({});
      axios.post.mockImplementationOnce(() => Promise.resolve({ data: { id } }));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(axios.post).toHaveBeenCalledWith(`/api/builds/${commitHash}`, { branchName });
    });

    it("should dispatch RUN_BUILD_FAILURE when run build fails", async () => {
      const store = mockStore({});
      const expected = [runBuildFailure("error")];
      axios.post.mockImplementationOnce(() => Promise.reject(new Error("error")));

      await store.dispatch(runBuild(commitHash, branchName, history));

      expect(store.getActions().filter(x => x.type === RUN_BUILD_FAILURE)).toEqual(expected);
    });
  });
});
