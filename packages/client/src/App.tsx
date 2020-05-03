import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import IndexPage from "./pages/IndexPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BuildDetails from "./pages/BuildDetails";
import Footer from "./components/Footer";
import { getSettings } from "./store/settings/actions";

const appName = "School CI server";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <IndexPage appName={appName} />
        </Route>
        <Route path="/settings">
          <Settings appName={appName} />
        </Route>
        <Route path="/build/:id">
          <BuildDetails appName={appName} />
        </Route>
        <Route path="*">
          <NotFound appName={appName} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
