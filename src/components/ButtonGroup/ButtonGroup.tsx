import React, { useState } from "react";
import "./ButtonGroup.css";
import Button, { ButtonProps } from "../Button/Button";

type ButtonGroupProps = {
  buttons: ButtonProps[];
};

const ButtonGroup = (props: ButtonGroupProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="button-group">
      {props.buttons &&
        props.buttons.map(
          (button: ButtonProps, i: number, buttons: ButtonProps[]) => {
            return (
              <Button
                key={`button-${i}`}
                value={button.value}
                onClick={() => {
                  setSelected(i);
                  button.onClick();
                }}
                selected={selected === i}
                size="md"
                position={
                  i === 0
                    ? "first"
                    : i + 1 === buttons.length
                    ? "last"
                    : "middle"
                }
              />
            );
          }
        )}
    </div>
  );
};

export default ButtonGroup;
