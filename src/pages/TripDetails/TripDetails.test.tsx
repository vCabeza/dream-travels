import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TravelPlan } from "../../App";
import TripDetails from "./TripDetails";

const markAsCompleted = jest.fn();
const dummyTrip: TravelPlan = {
  id: 0,
  title: "Test Trip",
  introduction: "",
  description: "",
  itinerary: [],
  photo_url: "",
  status: "todo",
};

describe("TripDetails", () => {
  it("renders", () => {
    render(<TripDetails trip={dummyTrip} markAsCompleted={markAsCompleted} />);
    const tripDetails = screen.getByLabelText("trip-details");
    expect(tripDetails).toBeVisible();
  });

  it("calls markAsComplete function when button is clicked", () => {
    render(<TripDetails trip={dummyTrip} markAsCompleted={markAsCompleted} />);
    const markAsCompletedButton = screen.getByRole("button", {
      name: /Mark as completed/i,
    });
    fireEvent.click(markAsCompletedButton);
    expect(markAsCompleted).toHaveBeenCalled();
  });
});
