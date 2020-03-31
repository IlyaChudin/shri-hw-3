import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StartScreen from "../../components/StartScreen";
import Button from "../../components/Button/Button";

function Home({ title }) {
  return (
    <>
      <Header title={title}>
        <Button href="/settings" icon={{ type: "settings", size: "s" }} size="s" />
      </Header>
      <StartScreen />
      <Footer />
    </>
  );
}

export default Home;
