import React from "react";
import Convert from "ansi-to-html";

function BuildLog({ text }) {
  const convert = new Convert({ fg: "#000", bg: "#000" });
  return <pre className="build-log" dangerouslySetInnerHTML={{ __html: convert.toHtml(text) }} />;
}

export default BuildLog;
