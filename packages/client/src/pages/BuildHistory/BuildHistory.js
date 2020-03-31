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
import Button from "../../components/Button/Button";

function BuildHistory({ title }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(x => x.builds);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (store.builds.length === 0) {
      dispatch(getBuilds(0));
    }
  }, [dispatch, store.builds.length]);

  const runBuildHandler = () => setIsOpen(true);
  const showMoreHandler = () => dispatch(getBuilds(store.builds.length));
  const onSubmit = ({ hash, branch }) => dispatch(runBuild(hash, branch, history));
  const onCancel = () => setIsOpen(false);

  const layout = cn("layout");
  return (
    <>
      <Header title={title} titleColor="primary">
        <Button text="Run build" icon={{ type: "play", size: "s" }} size="s" onClick={runBuildHandler} />
        <Button href="/settings" icon={{ type: "settings", size: "s" }} size="s" />
      </Header>
      <div className={classnames(layout({ "space-h": "s" }), cn("page")("content"))}>
        <div className={classnames(layout("container", { size: "s" }))}>
          <BuildList builds={store.builds} showMore={store.showMore} onShowMoreClick={showMoreHandler} />
        </div>
      </div>
      <Footer />
      <Modal isOpen={isOpen}>
        <NewBuildForm onSubmit={onSubmit} onCancel={onCancel} error={store.runBuildError} />
      </Modal>
    </>
  );
}

export default BuildHistory;
