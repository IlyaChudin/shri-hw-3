import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import Icon from "../Icon";
import { IconProps } from "../Icon/Icon";

const iconPlus = cn("icon-plus");

interface IconPlusProps {
  icon: IconProps;
  items: {
    text: string;
    type: string;
  }[];
  mix?: string;
}

const IconPlus: React.FC<IconPlusProps> = ({ icon, items, mix }) => {
  return (
    <div className={classnames(iconPlus(), mix)}>
      <Icon {...icon} />
      {items.map(({ text, type }, i: number) => (
        <span key={i} className={iconPlus("text", { type })}>
          {text}
        </span>
      ))}
    </div>
  );
};

export default IconPlus;
