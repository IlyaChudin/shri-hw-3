import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

function Build() {
  const { id } = useParams();
  const buttons = [
    {
      id: "rebuild",
      icon: {
        type: "rebuild",
        size: "s"
      },
      view: "default",
      text: "Rebuild",
      size: "s"
    },
    {
      id: "settings",
      href: "/settings",
      icon: {
        type: "settings",
        size: "s"
      },
      view: "default",
      size: "s"
    }
  ];
  return (
    <>
      <Header buttons={buttons} title="philip1967/my-awesome-repo-with-long-long-long-repo" titleColor="primary" />
      <p>{id}</p>
    </>
  );
}

export default Build;
