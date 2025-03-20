import React from "react";
import "./TextLink.css";
import classNames from "classnames";

type TextLinkProps = {
  text: string;
  onClick?: () => void;
  icon?: string;
  type?: "error" | "mark";
};

const TextLink = (props: TextLinkProps) => {
  const buttonClasses = classNames("link-button", {
    "link-button-red": props.type === "error",
    "link-button-mark": props.type === "mark",
  });

  return (
    <div className={buttonClasses} role={"button"} onClick={props.onClick}>
      {props.icon && <img src={props.icon} />}
      {props.text}
    </div>
  );
};

export default TextLink;
