import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import Icon from "../Icon";

function IconPlus(props) {
  const { icon, items, mix } = props;
  const iconPlus = cn("icon-plus");
  return (
    <div className={classnames(iconPlus(), mix)}>
      <Icon {...icon} />
      {items.map(({ text, type }, i) => (
        <span key={i} className={iconPlus("text", { type })}>
          {text}
        </span>
      ))}
    </div>
  );
}

export default IconPlus;
