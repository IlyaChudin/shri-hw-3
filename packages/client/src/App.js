import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BuildDetails from "./pages/BuildDetails";
import BuildHistory from "./pages/BuildHistory";
import Footer from "./components/Footer";
import { getSettings } from "./store/settings/actions";

const appName = "School CI server";

function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector(x => x.settings.isLoaded);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLoaded ? <BuildHistory appName={appName} /> : <Home appName={appName} />}
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
}

export default App;
