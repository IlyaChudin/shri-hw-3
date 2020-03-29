import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StartScreen from "../../components/StartScreen";
import BuildList from "../../components/BuildList";

function Home(props) {
  const settings = true;
  const header = settings
    ? {
        title: "philip1967/my-awesome-repo-with-long-long-long-repo",
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
