import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

const form = cn("form");

interface FormProps {
  title: string;
  description?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
  mix?: string;
}

const Form: React.FC<FormProps> = ({ title, description, onSubmit, children, error, mix }) => {
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
};

export default Form;
