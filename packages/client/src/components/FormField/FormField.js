import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";

const formField = cn("form-field");

function FormField(props) {
  const { title, required, type, children, addon, mix } = props;
  return (
    <div className={classnames(formField({ type, required }), mix)}>
      <span className={formField("title")}>{title}</span>
      {children}
      {addon && <span className={formField("addon")}>{addon}</span>}
    </div>
  );
}

export default FormField;
