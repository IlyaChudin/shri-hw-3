import React, { useEffect, useRef, useState } from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import Button from "../Button";

const input = cn("input");

function Input(props) {
  const { name, initialValue, placeholder, size, textAlign, clearButton, register, setValue, error, mix } = props;
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  const registerRefs = e => {
    register(e);
    inputRef.current = e;
  };

  useEffect(() => {
    setVisible(!!initialValue);
  }, [initialValue]);

  const clickHandler = () => {
    setValue(name);
    setVisible(false);
    inputRef.current.focus();
  };

  const changeHandler = e => setVisible(!!e.target.value);

  return (
    <div className={classnames(input({ "icon-position": clearButton ? "right" : undefined }), mix)}>
      {clearButton && (
        <Button
          onClick={clickHandler}
          view="clean"
          icon={{ type: "clear", size: "m" }}
          mix={input("icon", { actionable: true, visible })}
        />
      )}
      <input
        name={name}
        defaultValue={initialValue}
        ref={registerRefs}
        className={input("control", { size, "text-align": textAlign, view: error && "error" })}
        placeholder={placeholder}
        onChange={changeHandler}
      />
      {error && <p className={input("error")}>{error}</p>}
    </div>
  );
}

export default Input;
