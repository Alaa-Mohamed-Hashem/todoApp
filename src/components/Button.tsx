import React, { FC } from "react";
import classes from "../styles/modules/button.module.css";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  green: "green",
  secondary: "secondary",
  green_1: "green_1",
  red: "red",
};

type Variant = "green" | "secondary" | "green_1" | "red";

const Button: FC<{
  type?: string;
  variant: Variant;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}> = ({ children, type, variant, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getClasses([
        classes.button,
        classes[`button--${buttonTypes[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton: FC<{
  id: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
}> = ({ children, id, ...rest }) => {
  return (
    <select
      id={id}
      className={getClasses([classes.button, classes.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButton };

export default Button;
