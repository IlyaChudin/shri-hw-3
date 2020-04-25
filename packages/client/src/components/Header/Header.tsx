import React from "react";
import { Link } from "react-router-dom";
import cn from "../../classname";
import Layout from "../Layout";
import { ButtonProps } from "../Button/Button";

const header = cn("header");

interface HeaderProps {
  title: string;
  titleColor?: string;
  titleLink?: string;
  children?: React.ReactElement<ButtonProps>[];
}

const Header: React.FC<HeaderProps> = ({ title, titleColor = "default", titleLink = "/", children }) => {
  return (
    <Layout mix={header()} containerMix={header("content")}>
      <Link className={header("title", { color: titleColor })} to={titleLink}>
        {title}
      </Link>
      {children && (
        <div className={header("actions")}>
          {React.Children.map(children, x => React.cloneElement(x, { mix: header("button") }))}
        </div>
      )}
    </Layout>
  );
};

export default Header;
