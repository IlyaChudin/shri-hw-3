import React from "react";
import { useHistory } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import cn from "../../classname";
import IconPlus from "../IconPlus";
import { formatDuration, getCardView } from "../../helpers";

const buildCard = cn("build-card");

function BuildCard(props) {
  const {
    href,
    onClick,
    status,
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
  const history = useHistory();
  const clickHandler = e => {
    onClick && onClick(e);
    if (href) {
      history.push(href);
    }
  };
  return (
    <div className={classnames(buildCard({ view, type: getCardView(status) }), mix)} onClick={clickHandler}>
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
                { text: commitHash && commitHash.substring(0, 7), type: "secondary" }
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
                items={[{ text: format(new Date(date), "d MMM HH:mm", { locale: ru }), type: "secondary" }]}
              />
            )}
            {duration && (
              <IconPlus
                mix={buildCard("duration")}
                icon={{ type: "stopwatch", size: "xs" }}
                items={[{ text: formatDuration(duration), type: "secondary" }]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildCard;
