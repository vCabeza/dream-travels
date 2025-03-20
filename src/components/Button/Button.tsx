import React from "react";
import "./Button.css";
import classNames from "classnames";

export type ButtonProps = {
  onClick: () => void;
  value?: string;
  type?: "black";
  position?: "first" | "middle" | "last";
  size?: "sm" | "md";
  selected?: boolean;
  icon?: string;
  borderless?: boolean;
};

const Button = (props: ButtonProps) => {
  const buttonClasses = classNames("button", {
    "button-black": props.type === "black",
    "button-first": props.position === "first",
    "button-middle": props.position === "middle",
    "button-last": props.position === "last",
    "button-small": props.size === "sm",
    "button-medium": props.size === "md",
    "button-selected": props.selected,
    "button-icon": props.icon,
    "button-borderless": props.borderless,
  });

  return (
    <button
      className={buttonClasses}
      onClick={props.onClick}
      aria-label={props.icon ? "icon-button" : `${props.value}-button`}
    >
      {props.value && props.value}
      {props.icon && <img src={props.icon} />}
    </button>
  );
};

export default Button;
