import React, { useEffect } from "react";
import Header from "../../components/Header";
import StartScreen from "../../components/StartScreen";
import Button from "../../components/Button";

function Home({ appName }) {
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
}

export default Home;
