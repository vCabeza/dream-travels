import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TextField from "./TextField";

const onChange = jest.fn();

describe("TextField", () => {
  it("renders", () => {
    render(
      <TextField
        name={"test-textfield"}
        placeholder={"text-placeholder"}
        onChange={onChange}
      />
    );
    const testTextfield = screen.getByPlaceholderText(/text-placeholder/i);
    expect(testTextfield).toBeVisible();
  });

  it("shows title when informed", () => {
    render(
      <TextField
        name={"test-textfield"}
        placeholder={"text-placeholder"}
        onChange={onChange}
        title="This is the textfield title"
      />
    );

    const textFieldTitle = screen.getByText(/This is the textfield title/i);
    expect(textFieldTitle).toBeVisible();
  });

  it("shows default value when informed", () => {
    render(
      <TextField
        name={"test-textfield"}
        placeholder={"text-placeholder"}
        onChange={onChange}
        value="This is the textfield default value"
      />
    );

    const textfield = screen.getByPlaceholderText(/text-placeholder/i);
    expect(textfield).toHaveValue("This is the textfield default value");
  });

  it("calls to onChange function when value is modifed", () => {
    render(
      <TextField
        name={"test-textfield"}
        placeholder={"text-placeholder"}
        onChange={onChange}
      />
    );
    const testTextfield = screen.getByPlaceholderText(/text-placeholder/i);
    fireEvent.change(testTextfield, { target: { value: "Test Value" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Test Value",
        }),
      })
    );
  });
});

describe("TextArea", () => {
  it("renders", () => {
    render(
      <TextField
        name={"test-textfield"}
        placeholder={"text-placeholder"}
        onChange={onChange}
        textarea
      />
    );

    const textArea = screen.getByLabelText("textarea");
    expect(textArea).toBeVisible();
  });

  it("calls to onChange function when value is modifed", () => {
    render(
      <TextField
        name={"test-textfield"}
        placeholder={"text-placeholder"}
        onChange={onChange}
        textarea
      />
    );
    const testTextfield = screen.getByPlaceholderText(/text-placeholder/i);
    fireEvent.change(testTextfield, { target: { value: "Test Value" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Test Value",
        }),
      })
    );
  });
});
