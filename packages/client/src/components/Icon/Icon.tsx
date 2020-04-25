import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

export interface IconProps {
  type: string;
  size: string;
  mix?: string;
}

const Icon: React.FC<IconProps> = ({ type, size, mix }) => {
  return <div className={classnames(cn("icon")({ type, size }), mix)} />;
};

export default Icon;
