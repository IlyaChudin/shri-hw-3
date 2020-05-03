import React from "react";
import { useHistory } from "react-router-dom";
import { classnames } from "@bem-react/classnames";
import Icon from "../Icon";
import cn from "../../classname";
import { IconProps } from "../Icon/Icon";

const button = cn("button");

export interface ButtonProps {
  href?: string;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: "s" | "m";
  view?: "default" | "accent" | "clean" | "disabled";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  icon?: IconProps;
  mix?: string;
}

const Button: React.FC<ButtonProps> = ({
  href,
  text,
  onClick,
  size,
  view = "default",
  type = "button",
  disabled,
  icon,
  mix
}) => {
  const history = useHistory();
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    onClick && onClick(e);
    if (href) {
      history.push(href);
    }
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={classnames(button({ size, view: disabled ? "disabled" : view, "with-icon": !!icon }), mix)}
      onClick={clickHandler}
    >
      {icon && <Icon {...icon} mix={button("icon")} />}
      {text && <span className={button("text")}>{text}</span>}
    </button>
  );
};

export default Button;
