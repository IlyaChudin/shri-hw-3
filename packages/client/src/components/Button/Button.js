import React from "react";
import { useHistory } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import Icon from "../Icon";
import cn from "../../classname";

const button = cn("button");

function Button(props) {
  const { href, text, onClick, size, view = "default", disabled, icon, mix } = props;
  const history = useHistory();
  const clickHandler = e => {
    onClick && onClick(e);
    if (href) {
      history.push(href);
    }
  };
  return (
    <button
      disabled={disabled}
      className={classnames(button({ size, view: disabled ? "disabled" : view, "with-icon": !!icon }), mix)}
      onClick={clickHandler}
    >
      {icon && <Icon {...icon} mix={button("icon")} />}
      {text && <span className={button("text")}>{text}</span>}
    </button>
  );
}

export default Button;
