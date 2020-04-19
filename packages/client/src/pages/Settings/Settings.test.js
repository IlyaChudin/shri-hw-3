import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "mutationobserver-shim";
import Settings from ".";

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

describe("Settings page", () => {
  it("should display errors when form have required validation errors", async () => {
    const store = createStore();
    const { getByTestId, findAllByText } = render(<Settings />, { wrapper: wrapper(store) });

    fireEvent.submit(getByTestId("form"));

    const required = await findAllByText(/required/i);
    expect(required).toBeTruthy();
  });
});
