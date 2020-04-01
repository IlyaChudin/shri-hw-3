import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import BuildList from "../../components/BuildList";
import Modal from "../../components/Modal";
import NewBuildForm from "../../components/NewBuildForm";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { getBuilds, runBuild } from "../../store/builds/actions";

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

  return (
    <>
      <Header title={title} titleColor="primary">
        <Button text="Run build" icon={{ type: "play", size: "s" }} size="s" onClick={runBuildHandler} />
        <Button href="/settings" icon={{ type: "settings", size: "s" }} size="s" />
      </Header>
      <Layout isPageContent>
        <BuildList builds={store.builds} showMore={store.showMore} onShowMoreClick={showMoreHandler} />
      </Layout>
      <Modal isOpen={isOpen}>
        <NewBuildForm onSubmit={onSubmit} onCancel={onCancel} error={store.runBuildError} />
      </Modal>
    </>
  );
}

export default BuildHistory;
