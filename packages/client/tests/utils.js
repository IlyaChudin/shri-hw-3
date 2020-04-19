import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import React from "react";

export default store => ({ children }) => (
  <Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);
