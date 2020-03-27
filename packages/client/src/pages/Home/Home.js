import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StartScreen from "../../components/StartScreen";

function Home() {
  const buttons = [
    {
      id: "settings",
      href: "/settings",
      icon: {
        type: "settings",
        size: "s"
      },
      view: "default",
      text: "Settings",
      size: "s"
    }
  ];
  return (
    <>
      <Header buttons={buttons} title="School CI server" titleColor="default" />
      <StartScreen />
      <Footer />
    </>
  );
}

export default Home;
