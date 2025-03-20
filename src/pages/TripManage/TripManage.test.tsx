import React from "react";
import {
  fireEvent,
  queryByLabelText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import TripManage from "./TripManage";
import { TravelPlan } from "../../App";
import userEvent from "@testing-library/user-event";

const saveCard = jest.fn();
const dummyTrip: TravelPlan = {
  id: 0,
  title: "Test Trip",
  introduction: "",
  description: "",
  itinerary: [
    {
      day: 1,
      location: "Lisbon",
      description:
        "Explore the Alfama neighborhood and visit São Jorge Castle.",
    },
    {
      day: 2,
      location: "Lisbon",
      description:
        "Visit the Jerónimos Monastery and the Monument to the Discoveries.",
    },
  ],
  photo_url: "",
  status: "todo",
};

describe("TripManage", () => {
  it("renders", () => {
    render(<TripManage saveCard={saveCard} />);
    const tripManage = screen.getByLabelText("trip-manager");

    expect(tripManage).toBeVisible();
  });

  it("calls saveCard function when save button is clicked", () => {
    render(<TripManage saveCard={saveCard} />);
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    expect(saveCard).toHaveBeenCalled();
  });

  it("shows trip information when informed", () => {
    render(<TripManage trip={dummyTrip} saveCard={saveCard} />);
    const textfield = screen.getByPlaceholderText(/italy/i);

    expect(textfield).toHaveValue("Test Trip");
  });

  it("updates state when any value is modifed", () => {
    render(<TripManage trip={dummyTrip} saveCard={saveCard} />);
    const nameTextfield = screen.getByPlaceholderText(/italy/i);
    fireEvent.change(nameTextfield, {
      target: { value: "This text name has chaned" },
    });

    const introductionTextfield = screen.getByPlaceholderText(
      /From Rome to Venice.../i
    );
    fireEvent.change(introductionTextfield, {
      target: { value: "This text introduction has chaned" },
    });

    const descriptionTextfield = screen.getByPlaceholderText(
      /Discover the wonders of the Roman empire.../i
    );
    fireEvent.change(descriptionTextfield, {
      target: { value: "This text description has chaned" },
    });

    const imageTextfield = screen.getByPlaceholderText(/Image URL/i);
    fireEvent.change(imageTextfield, {
      target: { value: "This text image has chaned" },
    });

    expect(nameTextfield).toHaveValue("This text name has chaned");
    expect(introductionTextfield).toHaveValue(
      "This text introduction has chaned"
    );
    expect(descriptionTextfield).toHaveValue(
      "This text description has chaned"
    );
    expect(imageTextfield).toHaveValue("This text image has chaned");
  });

  it("updates itinerary state when any itinerary value is modifed", () => {
    render(<TripManage trip={dummyTrip} saveCard={saveCard} />);

    const locationTextfield = screen.getAllByPlaceholderText(/Location/i);
    fireEvent.change(locationTextfield[0], {
      target: { value: "This location has chaned" },
    });

    const descriptionTextfield = screen.getAllByPlaceholderText(/Description/i);
    fireEvent.change(descriptionTextfield[0], {
      target: { value: "This description has chaned" },
    });

    expect(locationTextfield[0]).toHaveValue("This location has chaned");
    expect(descriptionTextfield[0]).toHaveValue("This description has chaned");
  });

  it("updates itinerary state when day is modified", async () => {
    render(<TripManage trip={dummyTrip} saveCard={saveCard} />);

    const daySelect = screen.getAllByRole("combobox");
    expect(daySelect[0]).toHaveValue("1");

    await userEvent.selectOptions(daySelect[0], "2");
    expect(daySelect[0]).toHaveValue("2");
  });

  it("adds new day to itinerary when + button is clicked", async () => {
    render(<TripManage trip={dummyTrip} saveCard={saveCard} />);
    expect(screen.getAllByLabelText(/itinerary-element/i)).toHaveLength(2);

    const addDayButton = screen.getByRole("button", { name: /icon-button/i });
    fireEvent.click(addDayButton);

    expect(screen.getAllByLabelText(/itinerary-element/i)).toHaveLength(3);
  });
});
