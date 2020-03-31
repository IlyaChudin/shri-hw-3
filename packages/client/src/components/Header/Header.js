import React from "react";
import { Link } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

function Header(props) {
  const { title, titleColor = "default", titleLink = "/", children } = props;
  const header = cn("header");
  const layout = cn("layout");
  const buttons = React.Children.map(children, x => React.cloneElement(x, { mix: header("button") }));
  return (
    <div className={classnames(header(), layout({ "space-h": "s" }))}>
      <div className={classnames(header("content"), layout("container", { size: "s" }))}>
        <Link className={header("title", { color: titleColor })} to={titleLink}>
          {title}
        </Link>
        {children && <div className={header("actions")}>{buttons}</div>}
      </div>
    </div>
  );
}

export default Header;
