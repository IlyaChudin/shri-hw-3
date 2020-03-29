import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import BuildCard from "../BuildCard";
import Button from "../Button/Button";

function BuildList(props) {
  const buildList = cn("build-list");
  const layout = cn("layout");
  return (
    <div className={classnames(buildList(), layout({ "space-h": "s" }), cn("page")("content"))}>
      <div className={classnames(buildList("content"), layout("container", { size: "s" }))}>
        {new Array(9).fill(0).map((x, i) => (
          <BuildCard
            key={i}
            href={`/build/${1368}`}
            type="success"
            mix={buildList("item")}
            number="1368"
            title="add documentation for postgres scaler"
            commitBranch="master"
            commitHash="9c9f0b9"
            user="Philip Kirkorov"
            date="21 янв, 03:06"
            duration="1 ч 20 мин"
          />
        ))}
        <Button text="Show more" size="m" mix={buildList("button")} />
      </div>
    </div>
  );
}

export default BuildList;
