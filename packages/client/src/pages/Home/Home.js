import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StartScreen from "../../components/StartScreen";

function Home({ title }) {
  const header = {
    title,
    buttons: [
      {
        id: "settings",
        href: "/settings",
        icon: {
          type: "settings",
          size: "s"
        },
        text: "Settings",
        size: "s"
      }
    ]
  };

  return (
    <>
      <Header {...header} />
      <StartScreen />
      <Footer />
    </>
  );
}

export default Home;
