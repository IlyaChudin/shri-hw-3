import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

export interface IconProps {
  type: "settings" | "clear" | "play" | "rebuild" | "calendar" | "commit" | "stopwatch" | "user";
  size: "xs" | "s" | "m";
  mix?: string;
}

const Icon: React.FC<IconProps> = ({ type, size, mix }) => {
  return <div className={classnames(cn("icon")({ type, size }), mix)} />;
};

export default Icon;
