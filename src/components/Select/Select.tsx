import React, { useEffect, useState } from "react";
import "./Select.css";

type SelectProps = {
  name: string;
  elements: ElemetProps[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  selected?: number;
};

type ElemetProps = {
  value: number;
  text: string | number;
};

const Select = (props: SelectProps) => {
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    props.selected && setSelection(props.selected);
  }, [props.selected]);

  return (
    <div className="select-container">
      <select
        className="select"
        name={props.name}
        value={selection ? selection : 0}
        onChange={(e: any) => {
          props.onChange(e);
          setSelection(e.target.value);
        }}
      >
        {props.placeholder && (
          <option value="" disabled>
            {props.placeholder}
          </option>
        )}
        {props.elements &&
          props.elements.map((element: ElemetProps, i: number) => {
            return (
              <option value={element.value} key={`select-element-${i}`}>
                {element.text}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
