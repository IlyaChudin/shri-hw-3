import React from "react";
import { Link } from "react-router-dom";
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
        <Link className={header("title", { color: titleColor })} to="/">
          {title}
        </Link>
        {buttons && (
          <div className={header("actions")}>
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
