import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import BuildList from "../../components/BuildList";
import Modal from "../../components/Modal";
import NewBuildForm from "../../components/NewBuildForm";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { getBuilds, runBuild } from "../../store/builds/actions";
import { RootState } from "../../store";
import { BuildsState } from "../../store/builds/types";
import { NewBuildFormData } from "../../components/NewBuildForm/NewBuildForm";

const BuildsHistory: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector<RootState, BuildsState>(x => x.builds);
  const repoName = useSelector<RootState, string>(x => x.settings.repoName);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const appName = t("appName");

  useEffect(() => {
    document.title = `Build history - ${appName}`;
  }, [appName]);

  useEffect(() => {
    if (store.builds.length === 0) {
      dispatch(getBuilds());
    }
  }, [dispatch, store.builds.length]);

  const runBuildHandler = (): void => setIsOpen(true);
  const showMoreHandler = (): void => {
    dispatch(getBuilds(store.builds.length));
  };
  const onSubmit = ({ hash, branch }: NewBuildFormData): void => {
    dispatch(runBuild(hash, branch, history));
  };
  const onCancel = (): void => setIsOpen(false);

  return (
    <>
      <Header title={repoName} titleColor="primary">
        <Button text="Run build" icon={{ type: "play", size: "s" }} size="s" onClick={runBuildHandler} />
        <Button href="/settings" icon={{ type: "settings", size: "s" }} size="s" />
      </Header>
      <Layout isPageContent>
        <BuildList
          builds={store.builds}
          showMore={store.showMore}
          isLoading={store.isLoading}
          onShowMoreClick={showMoreHandler}
        />
      </Layout>
      <Modal isOpen={isOpen}>
        <NewBuildForm onSubmit={onSubmit} onCancel={onCancel} error={store.runBuildError} />
      </Modal>
    </>
  );
};

export default BuildsHistory;
