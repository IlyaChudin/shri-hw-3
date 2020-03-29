import React from "react";
import { withRouter } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import Icon from "../Icon";
import cn from "../../classname";

function Button(props) {
  const { href, history, text, onClick, size, view, icon, mix } = props;
  const button = cn("button");
  const clickHandler = e => {
    onClick && onClick(e);
    if (href) {
      history.push(href);
    }
  };
  return (
    <button className={classnames(button({ size, view, "with-icon": !!icon }), mix)} onClick={clickHandler}>
      {icon && (
        <div className={button("icon")}>
          <Icon {...icon} />
        </div>
      )}
      {text && <span className={button("text")}>{text}</span>}
    </button>
  );
}

export default withRouter(Button);
