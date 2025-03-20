import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TextLink from "./TextLink";

const onClick = jest.fn();

describe("TextLink", () => {
  it("renders", () => {
    render(<TextLink text={"Text Link"} />);
    const testTextLink = screen.getByRole("button", { name: /Text Link/i });
    expect(testTextLink).toBeVisible();
  });

  it("calls onClick when informed", () => {
    render(<TextLink text={"Text Link"} onClick={onClick} />);
    const testTextLink = screen.getByRole("button", { name: /Text Link/i });
    fireEvent.click(testTextLink);
    expect(onClick).toHaveBeenCalled();
  });
});
