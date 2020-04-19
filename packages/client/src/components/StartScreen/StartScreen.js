import React from "react";
import cn from "../../classname";
import Layout from "../Layout";
import Button from "../Button";
import logo from "../../images/logo.svg";

const startScreen = cn("start-screen");

function StartScreen() {
  return (
    <Layout isPageContent mix={startScreen()} containerMix={startScreen("content")}>
      <img src={logo} alt="logo" />
      <div data-testid="start-screen" className={startScreen("text")}>
        Configure repository connection and synchronization settings
      </div>
      <Button href="/settings" size="m" view="accent" text="Open settings" />
    </Layout>
  );
}

export default StartScreen;
