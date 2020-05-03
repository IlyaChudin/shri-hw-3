import React from "react";
import Convert from "ansi-to-html";

const convert = new Convert({ fg: "#000", bg: "#000" });

interface BuildLogProps {
  text: string;
}

const BuildLog: React.FC<BuildLogProps> = ({ text }) => {
  return <pre className="build-log" dangerouslySetInnerHTML={{ __html: convert.toHtml(text) }} />;
};

export default BuildLog;
