import React from "react";
import { Link } from "react-router-dom";
import cn from "../../classname";
import Layout from "../Layout";

const header = cn("header");

function Header(props) {
  const { title, titleColor = "default", titleLink = "/", children } = props;
  const buttons = React.Children.map(children, x => React.cloneElement(x, { mix: header("button") }));
  return (
    <Layout mix={header()} containerMix={header("content")}>
      <Link className={header("title", { color: titleColor })} to={titleLink}>
        {title}
      </Link>
      {children && <div className={header("actions")}>{buttons}</div>}
    </Layout>
  );
}

export default Header;
