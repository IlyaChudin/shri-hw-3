import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

const form = cn("form");

function Form(props) {
  const { title, description, onSubmit, children, error, mix } = props;
  return (
    <form data-testid="form" className={classnames(form(), mix)} onSubmit={onSubmit}>
      <div className={form("header")}>
        <span className={form("title")}>{title}</span>
        {description && <span className={form("description")}>{description}</span>}
      </div>
      {children}
      {error && <p className={form("error")}>{error}</p>}
    </form>
  );
}

export default Form;
