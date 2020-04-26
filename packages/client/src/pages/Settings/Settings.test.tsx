import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "mutationobserver-shim";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Settings from ".";
import createStore from "../../store";

jest.spyOn(React, "useEffect");

describe("Settings page", () => {
  it("should display errors when form have required validation errors", async () => {
    const store = createStore();
    store.dispatch = jest.fn();
    const { getByTestId, findAllByText } = render(<Settings />, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      )
    });

    fireEvent.submit(getByTestId("form"));

    const required = await findAllByText(/required/i);
    expect(required).toBeTruthy();
  });
});
