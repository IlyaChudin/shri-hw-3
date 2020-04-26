import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import IndexPage from ".";
import createStore, { RootState } from "../../store";

jest.spyOn(React, "useEffect");
jest.mock("react-modal");

describe("Index page", () => {
  it("should render Home when settings not loaded", () => {
    const store = createStore();
    store.dispatch = jest.fn();
    const { getByTestId } = render(<IndexPage />, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      )
    });

    const startScreen = getByTestId("start-screen");

    expect(startScreen).toBeTruthy();
  });

  it("should render BuildsHistory when settings is loaded", () => {
    const initial: Partial<RootState> = {
      settings: {
        id: "",
        repoName: "",
        buildCommand: "",
        mainBranch: "",
        period: 0,
        isLoaded: true,
        isSaving: false,
        saveError: undefined,
        getError: undefined
      }
    };

    const store = createStore(initial);
    store.dispatch = jest.fn();
    const { getByTestId } = render(<IndexPage />, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      )
    });

    const buildsHistory = getByTestId("build-list");

    expect(buildsHistory).toBeTruthy();
  });
});
