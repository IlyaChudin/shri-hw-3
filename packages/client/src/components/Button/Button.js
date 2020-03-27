import React from "react";
import Icon from "../Icon";
import cn from "../../classname";

function Button(props) {
  const { size, view, icon, text } = props;
  return (
    <button className={cn("button")({ size, view, "with-icon": !!icon }, props.mixes)}>
      {icon && (
        <div className="button__icon">
          <Icon {...icon} />
        </div>
      )}
      {text && <span className="button__text">{text}</span>}
    </button>
  );
}

export default Button;
