import React from "react";
import cn from "../../classname";

function Icon({ type, size, mixes }) {
  return <div className={cn("icon")({ type, size }, mixes)} />;
}

export default Icon;
