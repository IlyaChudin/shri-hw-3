import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import { useDispatch, useSelector } from "react-redux";
import cn from "../../classname";
import Header from "../../components/Header";
import BuildCard from "../../components/BuildCard";
import BuildLog from "../../components/BuildLog";
import Footer from "../../components/Footer";
import { clearDetails, getDetails, getLog } from "../../store/details/actions";
import { runBuild } from "../../store/builds/actions";

function Build() {
  const { id } = useParams();
  const settings = useSelector(x => x.settings);
  const store = useSelector(x => x.details);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetails(id));
    dispatch(getLog(id));
    return () => dispatch(clearDetails());
  }, [dispatch, id]);

  const buttons = [
    {
      id: "rebuild",
      icon: {
        type: "rebuild",
        size: "s"
      },
      view: "default",
      text: "Rebuild",
      size: "s",
      onClick: () => {
        if (store.details.commitHash) {
          dispatch(runBuild(store.details.commitHash, store.details.branchName, history));
        }
      }
    },
    {
      id: "settings",
      href: "/settings",
      icon: {
        type: "settings",
        size: "s"
      },
      view: "default",
      size: "s"
    }
  ];

  const layout = cn("layout");
  return (
    <>
      <Header buttons={buttons} title={settings.repoName} titleColor="primary" />
      <div className={classnames(layout({ "space-h": "s" }), cn("page")("content"))}>
        <div className={classnames(layout("container", { size: "s" }))}>
          {store.details && store.details.id && (
            <BuildCard
              view="details"
              status={store.details.status}
              number={store.details.buildNumber}
              title={store.details.commitMessage}
              commitBranch={store.details.branchName}
              commitHash={store.details.commitHash}
              user={store.details.authorName}
              date={store.details.start}
              duration={store.details.duration}
            />
          )}
          {store.getDetailsError && <p>{store.getDetailsError}</p>}
          {store.log && <BuildLog text={store.log} />}
          {store.getLogError && <p>{store.getLogError}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Build;
