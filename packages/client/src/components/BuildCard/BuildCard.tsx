import React from "react";
import { useHistory } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { BuildModel } from "@shri-ci/types";
import cn from "../../classname";
import IconPlus from "../IconPlus";
import { formatDuration, getCardView } from "../../helpers";

const buildCard = cn("build-card");

interface BuildCardProps extends BuildModel {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  view?: "default" | "details";
  mix?: string;
}

const BuildCard: React.FC<BuildCardProps> = ({
  href,
  onClick,
  status,
  view = "default",
  buildNumber,
  commitMessage,
  branchName,
  commitHash,
  authorName,
  start,
  duration,
  mix
}) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const locale = i18n.languages[0] === "ru" ? ru : enUS;
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    onClick?.(e);
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
            <div className={buildCard("number")}>#{buildNumber}</div>
            <div className={buildCard("title")}>{commitMessage}</div>
          </div>
          <div className={buildCard("info")}>
            <IconPlus
              mix={buildCard("commit")}
              icon={{ type: "commit", size: "xs" }}
              items={[
                { text: branchName, type: "primary" },
                { text: commitHash && commitHash.substring(0, 7), type: "secondary" }
              ]}
            />
            <IconPlus
              mix={buildCard("user")}
              icon={{ type: "user", size: "xs" }}
              items={[{ text: authorName, type: "primary" }]}
            />
          </div>
        </div>
        {(start || duration !== undefined) && (
          <div className={buildCard("time")}>
            {start && (
              <IconPlus
                mix={buildCard("date")}
                icon={{ type: "calendar", size: "xs" }}
                items={[{ text: format(new Date(start), "d MMM HH:mm", { locale }), type: "secondary" }]}
              />
            )}
            {duration !== undefined && (
              <IconPlus
                mix={buildCard("duration")}
                icon={{ type: "stopwatch", size: "xs" }}
                items={[{ text: formatDuration(duration, t), type: "secondary" }]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildCard;
