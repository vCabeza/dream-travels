import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonGroup from "./ButtonGroup";

const onClick = jest.fn();

describe("ButtonGroup", () => {
  it("renders all buttons", () => {
    render(
      <ButtonGroup
        buttons={[
          { value: "First Button", onClick: onClick },
          { value: "Mid Button", onClick: onClick },
          { value: "Last Button", onClick: onClick },
        ]}
      />
    );

    const firstButton = screen.getByRole("button", { name: /First Button/i });
    const midButton = screen.getByRole("button", { name: /Mid Button/i });
    const lastButton = screen.getByRole("button", { name: /Last Button/i });
    expect(firstButton).toBeVisible();
    expect(midButton).toBeVisible();
    expect(lastButton).toBeVisible();
  });

  it("asigns proper classNames", () => {
    render(
      <ButtonGroup
        buttons={[
          { value: "First Button", onClick: onClick },
          { value: "Mid Button", onClick: onClick },
          { value: "Last Button", onClick: onClick },
        ]}
      />
    );

    const firstButton = screen.getByRole("button", { name: /First Button/i });
    const midButton = screen.getByRole("button", { name: /Mid Button/i });
    const lastButton = screen.getByRole("button", { name: /Last Button/i });
    expect(firstButton).toHaveClass("button-first");
    expect(midButton).toHaveClass("button-middle");
    expect(lastButton).toHaveClass("button-last");
  });
});
