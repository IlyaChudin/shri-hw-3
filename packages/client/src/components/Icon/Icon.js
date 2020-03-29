import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

function Icon({ type, size, mix }) {
  return <div className={classnames(cn("icon")({ type, size }), mix)} />;
}

export default Icon;
