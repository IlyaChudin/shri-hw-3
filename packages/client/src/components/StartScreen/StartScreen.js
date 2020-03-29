import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import Button from "../Button";
import logo from "../../images/logo.svg";

function StartScreen() {
  const startScreen = cn("start-screen");
  const layout = cn("layout");
  return (
    <div className={classnames(startScreen(), layout({ "space-h": "s" }), cn("page")("content"))}>
      <div className={classnames(startScreen("content"), layout("container", { size: "s" }))}>
        <img src={logo} alt="logo" />
        <div className={startScreen("text")}>Configure repository connection and synchronization settings</div>
        <Button href="/settings" size="m" view="accent" text="Open settings" />
      </div>
    </div>
  );
}

export default StartScreen;
