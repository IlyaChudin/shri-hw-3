import React from "react";
import { BuildModel } from "@shri-ci/types";
import cn from "../../classname";
import BuildCard from "../BuildCard";
import Button from "../Button";
import Loading from "../Loading";

const buildList = cn("build-list");

interface BuildListProps {
  builds: BuildModel[];
  showMore: boolean;
  isLoading: boolean;
  onShowMoreClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BuildList: React.FC<BuildListProps> = ({ builds, showMore, isLoading, onShowMoreClick }) => {
  return (
    <div data-testid="build-list" className={buildList()}>
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
      {isLoading && <Loading />}
      {showMore && !isLoading && (
        <Button text="Show more" size="m" mix={buildList("button")} onClick={onShowMoreClick} />
      )}
    </div>
  );
};

export default BuildList;
