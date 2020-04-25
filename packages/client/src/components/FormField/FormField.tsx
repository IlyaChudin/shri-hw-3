import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

const formField = cn("form-field");

interface FormFieldProps {
  title: string;
  required?: boolean;
  type: string;
  addon?: string;
  mix?: string;
}

const FormField: React.FC<FormFieldProps> = ({ title, required = false, type, children, addon, mix }) => {
  return (
    <div className={classnames(formField({ type, required }), mix)}>
      <span className={formField("title")}>{title}</span>
      {children}
      {addon && <span className={formField("addon")}>{addon}</span>}
    </div>
  );
};

export default FormField;
