import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import BuildCard from "../../components/BuildCard";
import BuildLog from "../../components/BuildLog";
import { clearDetails, getDetails, getLog } from "../../store/details/actions";
import { runBuild } from "../../store/builds/actions";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { RootState } from "../../store";
import { DetailsState } from "../../store/details/types";

const BuildDetails: React.FC = () => {
  const { id } = useParams();
  const store = useSelector<RootState, DetailsState>(x => x.details);
  const repoName = useSelector<RootState, string>(x => x.settings.repoName);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const appName = t("appName");

  useEffect(() => {
    if (store.details) {
      document.title = `Build #${store.details.buildNumber} - ${appName}`;
    }
  }, [store.details, appName]);

  useEffect(() => {
    if (id) {
      dispatch(getDetails(id));
      dispatch(getLog(id));
    }
    return (): void => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  const rebuildHandler = (): void => {
    if (store.details?.commitHash) {
      dispatch(runBuild(store.details.commitHash, store.details.branchName, history));
    }
  };

  return (
    <>
      <Header title={repoName} titleColor="primary">
        <Button text="Rebuild" icon={{ type: "rebuild", size: "s" }} size="s" onClick={rebuildHandler} />
        <Button href="/settings" icon={{ type: "settings", size: "s" }} size="s" />
      </Header>
      <Layout isPageContent>
        {store.details?.id && <BuildCard view="details" {...store.details} />}
        {store.getDetailsError && <p>{store.getDetailsError}</p>}
        {store.logLoading && <Loading />}
        {store.log && <BuildLog text={store.log} />}
        {store.getLogError && <p>{store.getLogError}</p>}
      </Layout>
    </>
  );
};

export default BuildDetails;
