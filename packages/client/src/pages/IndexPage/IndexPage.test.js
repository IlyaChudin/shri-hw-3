import React from "react";
import { render } from "@testing-library/react";
import IndexPage from ".";
import createStore from "../../store";
import wrapper from "../../../tests/utils";

jest.spyOn(React, "useEffect");
jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn().mockReturnValue(() => {})
  };
});
jest.mock("react-modal");

describe("Index page", () => {
  it("should render Home when settings not loaded", () => {
    const store = createStore();
    const { getByTestId } = render(<IndexPage />, { wrapper: wrapper(store) });

    const startScreen = getByTestId("start-screen");

    expect(startScreen).toBeTruthy();
  });

  it("should render BuildsHistory when settings is loaded", () => {
    const store = createStore({ settings: { isLoaded: true } });
    const { getByTestId } = render(<IndexPage />, { wrapper: wrapper(store) });

    const buildsHistory = getByTestId("build-list");

    expect(buildsHistory).toBeTruthy();
  });
});
