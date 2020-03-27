import React from "react";
import Button from "../Button";
import logo from "../../images/logo.svg";

function StartScreen() {
  return (
    <div class="start-screen layout layout_space-h_s page__content">
      <div class="start-screen__content layout__container layout__container_size_s">
        <img src={logo} alt="logo" />
        <div class="start-screen__text">Configure repository connection and synchronization settings</div>
        <Button size="m" view="accent" text="Open settings" />
      </div>
    </div>
  );
}

export default StartScreen;
