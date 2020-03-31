import React, { useEffect } from "react";
import { classnames } from "@bem-react/classnames";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import cn from "../../classname";
import BuildCard from "../BuildCard";
import Button from "../Button/Button";
import { getBuilds } from "../../store/builds/actions";

function getCardView(status) {
  switch (status) {
    case "Waiting":
    case "InProgress":
      return "pending";
    case "Success":
      return "success";
    default:
      return "fail";
  }
}

function formatDuration(duration) {
  const date = new Date(duration * 1000);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getSeconds();
  return h > 0 ? `${h} ч ${m} мин` : `${m} м ${s} сек`;
}

function BuildList() {
  const store = useSelector(x => x.builds);
  const dispatch = useDispatch();
  useEffect(() => {
    if (store.builds.length === 0) {
      dispatch(getBuilds(0));
    }
  }, [dispatch, store.builds.length]);

  const showMoreHandler = e => {
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
            type={getCardView(build.status)}
            mix={buildList("item")}
            number={build.buildNumber}
            title={build.commitMessage}
            commitBranch={build.branchName}
            commitHash={build.commitHash.substring(0, 7)}
            user={build.authorName}
            date={build.start && format(new Date(build.start), "d MMM HH:mm", { locale: ru })}
            duration={build.duration && formatDuration(build.duration)}
          />
        ))}
        {store.showMore && <Button text="Show more" size="m" mix={buildList("button")} onClick={showMoreHandler} />}
      </div>
    </div>
  );
}

export default BuildList;
