import React from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import Button from "../Button/Button";

function Input(props) {
  const { placeholder, clearButton, size, textAlign, value, onChange, mix } = props;
  const input = cn("input");
  const clickHandler = () => onChange("");
  const changeHandler = e => onChange(e.target.value);
  return (
    <div className={classnames(input({ "icon-position": clearButton ? "right" : undefined }), mix)}>
      {clearButton && (
        <Button
          onClick={clickHandler}
          view="clean"
          icon={{ type: "clear", size: "m" }}
          mix={input("icon", { actionable: true, visible: !!value })}
        />
      )}
      <input
        className={input("control", { size, "text-align": textAlign })}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
}

export default Input;
