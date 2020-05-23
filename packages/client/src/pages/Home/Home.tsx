import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import StartScreen from "../../components/StartScreen";
import Button from "../../components/Button";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const appName = t("appName");

  useEffect(() => {
    document.title = `Home - ${appName}`;
  }, [appName]);

  return (
    <>
      <Header title={appName}>
        <Button href="/settings" icon={{ type: "settings", size: "s" }} size="s" text="Settings" />
      </Header>
      <StartScreen />
    </>
  );
};

export default Home;
