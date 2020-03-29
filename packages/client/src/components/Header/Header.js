import React from "react";
import { classnames } from "@bem-react/classnames";
import Button from "../Button";
import cn from "../../classname";

function Header(props) {
  const { buttons, title, titleColor = "default" } = props;
  const header = cn("header");
  const layout = cn("layout");
  return (
    <div className={classnames(header(), layout({ "space-h": "s" }))}>
      <div className={classnames(header("content"), layout("container", { size: "s" }))}>
        <div className={header("title", { color: titleColor })}>{title}</div>
        {buttons && (
          <div className={header("action")}>
            {buttons.map(({ id, ...buttonProps }) => (
              <Button key={id} {...buttonProps} mix={header("button")} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
