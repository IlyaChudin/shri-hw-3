import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BuildDetails from "./pages/BuildDetails";
import BuildHistory from "./pages/BuildHistory";
import { getSettings } from "./store/settings/actions";

const defaultTitle = "School CI server";

function App() {
  const dispatch = useDispatch();
  const settings = useSelector(x => x.settings);
  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {settings.isLoaded ? <BuildHistory title={settings.repoName} /> : <Home title={defaultTitle} />}
        </Route>
        <Route path="/settings">
          <Settings title={defaultTitle} />
        </Route>
        <Route path="/build/:id">
          <BuildDetails title={settings.repoName} />
        </Route>
        <Route path="*">
          <NotFound title={defaultTitle} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
