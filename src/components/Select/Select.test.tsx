import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./Select";
import userEvent from "@testing-library/user-event";

const onChange = jest.fn();
const dummyElements = [
  { value: 0, text: "Zero" },
  { value: 1, text: "One" },
  { value: 2, text: "Two" },
];

describe("Select", () => {
  it("renders", () => {
    render(
      <Select
        name={"TestSelect"}
        elements={dummyElements}
        onChange={onChange}
      />
    );
    const testSelect = screen.getByRole("combobox");
    expect(testSelect).toBeVisible();
  });

  it("selects correct value", async () => {
    render(
      <Select
        name={"TestSelect"}
        elements={dummyElements}
        onChange={onChange}
      />
    );

    await userEvent.selectOptions(screen.getByRole("combobox"), "0");
    expect(screen.getByRole("combobox")).toHaveValue("0");
  });
});
