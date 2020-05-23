import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import IndexPage from "./pages/IndexPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BuildDetails from "./pages/BuildDetails";
import Footer from "./components/Footer";
import { getSettings } from "./store/settings/actions";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/build/:id">
          <BuildDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
