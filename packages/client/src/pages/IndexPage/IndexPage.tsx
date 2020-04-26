import React from "react";
import { useSelector } from "react-redux";
import Home from "../Home";
import BuildsHistory from "../BuildsHistory";
import { PageProps } from "../PageProps";
import { RootState } from "../../store";

const IndexPage: React.FC<PageProps> = ({ appName }) => {
  const isLoaded = useSelector<RootState, boolean>(x => x.settings.isLoaded);

  return isLoaded ? <BuildsHistory appName={appName} /> : <Home appName={appName} />;
};

export default IndexPage;
