import React from "react";
import cn from "../../classname";
import BuildCard from "../BuildCard";
import Button from "../Button";

const buildList = cn("build-list");

function BuildList(props) {
  const { builds, showMore, onShowMoreClick } = props;
  return (
    <div className={buildList()}>
      {builds.map(build => (
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
      {showMore && <Button text="Show more" size="m" mix={buildList("button")} onClick={onShowMoreClick} />}
    </div>
  );
}

export default BuildList;
