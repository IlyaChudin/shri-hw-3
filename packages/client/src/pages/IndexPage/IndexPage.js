import React from "react";
import { useSelector } from "react-redux";
import Home from "../Home";
import BuildsHistory from "../BuildsHistory";

function IndexPage({ appName }) {
  const isLoaded = useSelector(x => x.settings.isLoaded);

  return isLoaded ? <BuildsHistory appName={appName} /> : <Home appName={appName} />;
}

export default IndexPage;
