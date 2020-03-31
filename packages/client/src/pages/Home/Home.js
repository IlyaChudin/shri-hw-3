import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StartScreen from "../../components/StartScreen";
import BuildList from "../../components/BuildList";
import Modal from "../../components/Modal";
import NewBuildForm from "../../components/NewBuildForm";
import { runBuild } from "../../store/builds/actions";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(x => x.builds.runBuildError);
  const settings = useSelector(x => x.settings);
  const [isOpen, setIsOpen] = useState(false);
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
            size: "s",
            onClick: () => {
              setIsOpen(true);
            }
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
  const onCancel = () => setIsOpen(false);
  const onSubmit = ({ hash }) => {
    dispatch(runBuild(hash, "master", history));
  };
  return (
    <>
      <Header {...header} />
      {settings ? <BuildList /> : <StartScreen />}
      <Footer />
      <Modal isOpen={isOpen}>
        <NewBuildForm onSubmit={onSubmit} onCancel={onCancel} error={error} />
      </Modal>
    </>
  );
}

export default Home;
