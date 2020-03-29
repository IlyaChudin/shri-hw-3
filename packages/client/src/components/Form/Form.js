import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

function Form(props) {
  const { title, description, children, mix } = props;
  const form = cn("form");
  return (
    <div className={classnames(form(), mix)}>
      <div className={form("header")}>
        <span className={form("title")}>{title}</span>
        <span className={form("description")}>{description}</span>
      </div>
      {children}
    </div>
  );
}

export default Form;
