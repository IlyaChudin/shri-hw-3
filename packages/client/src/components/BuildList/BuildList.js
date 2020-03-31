import React, { useEffect } from "react";
import { classnames } from "@bem-react/classnames";
import { useDispatch, useSelector } from "react-redux";
import cn from "../../classname";
import BuildCard from "../BuildCard";
import Button from "../Button/Button";
import { getBuilds } from "../../store/builds/actions";

function BuildList() {
  const store = useSelector(x => x.builds);
  const dispatch = useDispatch();
  useEffect(() => {
    if (store.builds.length === 0) {
      dispatch(getBuilds(0));
    }
  }, [dispatch, store.builds.length]);

  const showMoreHandler = _ => {
    dispatch(getBuilds(store.builds.length));
  };

  const buildList = cn("build-list");
  const layout = cn("layout");
  return (
    <div className={classnames(buildList(), layout({ "space-h": "s" }), cn("page")("content"))}>
      <div className={classnames(buildList("content"), layout("container", { size: "s" }))}>
        {store.builds.map(build => (
          <BuildCard
            key={build.id}
            href={`/build/${build.id}`}
            status={build.status}
            mix={buildList("item")}
            number={build.buildNumber}
            title={build.commitMessage}
            commitBranch={build.branchName}
            commitHash={build.commitHash}
            user={build.authorName}
            date={build.start}
            duration={build.duration}
          />
        ))}
        {store.showMore && <Button text="Show more" size="m" mix={buildList("button")} onClick={showMoreHandler} />}
      </div>
    </div>
  );
}

export default BuildList;
