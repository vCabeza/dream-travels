import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

const onSearch = jest.fn();

describe("SearchBar", () => {
  it("renders", () => {
    render(<SearchBar onSearch={onSearch} />);

    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeVisible();
  });

  it("calls onSearch function when clicked", () => {
    render(<SearchBar onSearch={onSearch} />);

    const searchBar = screen.getByPlaceholderText(/Search trips/i);
    fireEvent.change(searchBar, { target: { value: "Egypt" } });

    const searchButton = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledWith("Egypt");
  });
});
