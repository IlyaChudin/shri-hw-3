import React from "react";
import { withRouter } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import IconPlus from "../IconPlus";

function BuildCard(props) {
  const {
    href,
    history,
    onClick,
    type,
    view = "default",
    number,
    title,
    commitBranch,
    commitHash,
    user,
    date,
    duration,
    mix
  } = props;
  const buildCard = cn("build-card");
  const clickHandler = e => {
    onClick && onClick(e);
    if (href) {
      history.push(href);
    }
  };
  return (
    <div className={classnames(buildCard({ view, type }), mix)} onClick={clickHandler}>
      <div className={buildCard("status")} />
      <div className={buildCard("container")}>
        <div>
          <div className={buildCard("header")}>
            <div className={buildCard("number")}>#{number}</div>
            <div className={buildCard("title")}>{title}</div>
          </div>
          <div className={buildCard("info")}>
            <IconPlus
              mix={buildCard("commit")}
              icon={{ type: "commit", size: "xs" }}
              items={[
                { text: commitBranch, type: "primary" },
                { text: commitHash, type: "secondary" }
              ]}
            />
            <IconPlus
              mix={buildCard("user")}
              icon={{ type: "user", size: "xs" }}
              items={[{ text: user, type: "primary" }]}
            />
          </div>
        </div>
        {(date || duration) && (
          <div className={buildCard("time")}>
            {date && (
              <IconPlus
                mix={buildCard("date")}
                icon={{ type: "calendar", size: "xs" }}
                items={[{ text: date, type: "secondary" }]}
              />
            )}
            {duration && (
              <IconPlus
                mix={buildCard("duration")}
                icon={{ type: "stopwatch", size: "xs" }}
                items={[{ text: duration, type: "secondary" }]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(BuildCard);
