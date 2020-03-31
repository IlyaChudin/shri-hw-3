import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BuildList from "../../components/BuildList";
import Modal from "../../components/Modal";
import NewBuildForm from "../../components/NewBuildForm";
import { getBuilds, runBuild } from "../../store/builds/actions";
import cn from "../../classname";

function BuildHistory() {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(x => x.builds.runBuildError);
  const settings = useSelector(x => x.settings);
  const [isOpen, setIsOpen] = useState(false);
  const header = {
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
  };
  const onCancel = () => setIsOpen(false);
  const onSubmit = ({ hash }) => {
    dispatch(runBuild(hash, "master", history));
  };
  const store = useSelector(x => x.builds);
  useEffect(() => {
    if (store.builds.length === 0) {
      dispatch(getBuilds(0));
    }
  }, [dispatch, store.builds.length]);

  const showMoreHandler = _ => {
    dispatch(getBuilds(store.builds.length));
  };
  const layout = cn("layout");
  return (
    <>
      <Header {...header} />
      <div className={classnames(layout({ "space-h": "s" }), cn("page")("content"))}>
        <div className={classnames(layout("container", { size: "s" }))}>
          <BuildList builds={store.builds} showMore={store.showMore} onShowMoreClick={showMoreHandler} />
        </div>
      </div>
      <Footer />
      <Modal isOpen={isOpen}>
        <NewBuildForm onSubmit={onSubmit} onCancel={onCancel} error={error} />
      </Modal>
    </>
  );
}

export default BuildHistory;
