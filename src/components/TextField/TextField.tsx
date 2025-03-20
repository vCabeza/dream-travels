import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./TextField.css";

type TextFieldProps = {
  name: string;
  placeholder: string;
  onChange: (e: any) => void;
  title?: string;
  value?: string;
  textarea?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

const TextField = (props: TextFieldProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    props.value && setValue(props.value);
  }, [props.value]);

  const textFieldClasses = classNames("textfield", "textfield-typography", {
    textarea: props.textarea,
    "textfield-small": props.size === "sm",
    "textfield-medium": props.size === "md",
    "textfield-large": props.size === "lg",
    "textfield-xl": props.size === "xl",
  });

  return (
    <div className="textfield-container">
      <div className="textfield-title">{props.title}</div>
      {props.textarea ? (
        <textarea
          name={props.name}
          aria-label="textarea"
          placeholder={props.placeholder}
          className={textFieldClasses}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange(e);
          }}
        />
      ) : (
        <input
          name={props.name}
          aria-label="textfield"
          type="textfield"
          placeholder={props.placeholder}
          className={textFieldClasses}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange(e);
          }}
        />
      )}
    </div>
  );
};

export default TextField;
