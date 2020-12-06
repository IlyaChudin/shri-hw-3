import React from "react";
import { useTranslation } from "react-i18next";
import cn from "../../classname";
import Layout from "../Layout";
import Button from "../Button";
import logo from "../../images/logo.svg";

const startScreen = cn("start-screen");

const StartScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout isPageContent mix={startScreen()} containerMix={startScreen("content")}>
      <img src={logo} alt="logo" />
      <div data-testid="start-screen" className={startScreen("text")}>
        {t("startScreen.text")}
      </div>
      <Button href="/settings" size="m" view="accent" text={t("startScreen.button")} />
    </Layout>
  );
};

export default StartScreen;
