import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StartScreen from "../../components/StartScreen";
import BuildList from "../../components/BuildList";

function Home() {
  const settings = useSelector(x => x.settings);
  const header = settings
    ? {
        title: settings.repoName,
        titleColor: "primary",
        buttons: [
          {
            id: "runBuild",
            icon: {
              type: "play",
              size: "s"
            },
            text: "Run build",
            size: "s"
          },
          {
            id: "settings",
            href: "/settings",
            icon: {
              type: "settings",
              size: "s"
            },
            size: "s"
          }
        ]
      }
    : {
        title: "School CI server",
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
      {settings ? <BuildList /> : <StartScreen />}
      <Footer />
    </>
  );
}

export default Home;
