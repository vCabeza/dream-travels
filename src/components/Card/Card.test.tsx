import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";
import { TravelPlan } from "../../App";

const onOpen = jest.fn();
const onEdit = jest.fn();
const onDelete = jest.fn();
const dummyTrip: TravelPlan = {
  id: 0,
  title: "Test Trip",
  introduction: "",
  description: "",
  itinerary: [],
  photo_url: "",
  status: "todo",
};

describe("Card", () => {
  it("renders", () => {
    render(
      <Card
        trip={dummyTrip}
        onOpen={onOpen}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const tripTitle = screen.getByText(/test trip/i);
    expect(tripTitle).toBeVisible();
  });

  it("calls onOpen function when onOpen button is clicked", () => {
    render(
      <Card
        trip={dummyTrip}
        onOpen={onOpen}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const onOpenButton = screen.getByRole("button", {
      name: /see trip details/i,
    });
    fireEvent.click(onOpenButton);
    expect(onOpen).toHaveBeenCalled();
  });

  it("calls onEdit function when onEdit button is clicked", () => {
    render(
      <Card
        trip={dummyTrip}
        onOpen={onOpen}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const onEditButton = screen.getByRole("button", {
      name: /edit/i,
    });
    fireEvent.click(onEditButton);
    expect(onEdit).toHaveBeenCalled();
  });

  it("calls onDelete function when onDelete button is clicked", () => {
    render(
      <Card
        trip={dummyTrip}
        onOpen={onOpen}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    const onDeleteButton = screen.getByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(onDeleteButton);
    expect(onDelete).toHaveBeenCalled();
  });
});
