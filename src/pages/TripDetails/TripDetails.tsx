import React, { useEffect, useState } from "react";
import "./TripDetails.css";
import TextLink from "../../components/TextLink/TextLink";
import Check from "../../icons/check.png";
import Checked from "../../icons/check-icon.png";
import { ItineraryItem, TravelPlan } from "../../App";

type TripDetailsProps = {
  trip: TravelPlan;
  markAsCompleted: (trip: TravelPlan) => void;
};

const TripDetails = (props: TripDetailsProps) => {
  const [trip, setTrip] = useState<TravelPlan>({
    id: 0,
    title: "",
    introduction: "",
    description: "",
    itinerary: [],
    photo_url: "",
    status: "todo",
  });
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { day: 0, location: "", description: "" },
  ]);

  useEffect(() => {
    if (props.trip) {
      setTrip(props.trip);
      setItinerary(props.trip.itinerary);
    }
  }, [props.trip]);

  function markAsCompleted() {
    const updatedTrip: TravelPlan = { ...trip, status: "done" };
    setTrip(updatedTrip);
    props.markAsCompleted(updatedTrip);
  }

  return (
    <div className="trip-details" aria-label={"trip-details"}>
      <div className="trip-header">
        <div className="trip-header-title">{trip.title}</div>
        {trip.status === "todo" ? (
          <TextLink
            text="Mark as completed"
            type="mark"
            icon={Check}
            onClick={() => markAsCompleted()}
          />
        ) : (
          <TextLink text="Completed" type="mark" icon={Checked} />
        )}
      </div>
      <div className="trip-description">{trip.description}</div>

      <div className="divider" />

      <div className="trip-itinerary-header-title">Itinerary</div>
      <div className="trip-itinerary-container">
        {itinerary &&
          itinerary.map((day, i, itinerary) => (
            <div
              key={`itinerary-location-${day.location}-day-${day.day}`}
              className="trip-itinerary-item"
            >
              <div className="trip-itinerary-item-guide">
                <div className="trip-itinerary-item-dot" />
                {i + 1 < itinerary.length && (
                  <div className="trip-itinerary-item-line-after" />
                )}
                {i !== 0 && <div className="trip-itinerary-item-line-before" />}
              </div>
              <div className="trip-itinerary-body">
                <div className="trip-itinerary-body-header">
                  Day {day.day}: {day.location}
                </div>
                <div className="trip-itinerary-body-description">
                  {day.description}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TripDetails;
