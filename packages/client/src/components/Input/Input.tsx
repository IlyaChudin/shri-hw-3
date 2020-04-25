import React, { useEffect, useRef, useState } from "react";
import { classnames } from "@bem-react/classnames";
import cn from "../../classname";
import Button from "../Button";

const input = cn("input");

interface InputProps {
  name: string;
  initialValue?: string;
  placeholder?: string;
  size?: string;
  textAlign?: string;
  clearButton?: boolean;
  register: (ref: HTMLInputElement) => void;
  setValue?: (name: string) => void;
  error?: string;
  mix?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  initialValue,
  placeholder,
  size,
  textAlign,
  clearButton,
  register,
  setValue,
  error,
  mix
}: InputProps) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const registerRefs = (e: HTMLInputElement): void => {
    register(e);
    if (inputRef) {
      inputRef.current = e;
    }
  };

  useEffect(() => {
    setVisible(!!initialValue);
  }, [initialValue]);

  const clickHandler = (): void => {
    setValue && setValue(name);
    setVisible(false);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => setVisible(!!e.target.value);

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
};

export default Input;
