import React from "react";
import { useSelector } from "react-redux";
import Home from "../Home";
import BuildsHistory from "../BuildsHistory";
import { RootState } from "../../store";

const IndexPage: React.FC = () => {
  const isLoaded = useSelector<RootState, boolean>(x => x.settings.isLoaded);

  return isLoaded ? <BuildsHistory /> : <Home />;
};

export default IndexPage;
