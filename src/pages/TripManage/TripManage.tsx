import React, { useEffect, useState } from "react";
import "./TripManage.css";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Plus from "../../icons/plus-circle.png";
import Select from "../../components/Select/Select";
import { TravelPlan, ItineraryItem } from "../../App";

type TripManageProps = {
  saveCard: (trip: TravelPlan) => void;
  trip?: TravelPlan;
};

const TripManage = (props: TripManageProps) => {
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
    props.trip && setTrip(props.trip);
    props.trip?.itinerary && setItinerary(props.trip.itinerary);
  }, [props.trip]);

  function handleChangeTrip(e: any) {
    const { name, value } = e.target;
    const tempTrip = { ...trip, [name]: value };
    setTrip(tempTrip);
  }

  function handleChangeItinerary(e: any, index: number) {
    const { name, value } = e.target;
    const updatedItinerary = [...itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [name]: value };
    setItinerary(updatedItinerary);
  }

  function addDay() {
    const itineraryCopy = [...itinerary];
    itineraryCopy.push({ day: 0, location: "", description: "" });
    setItinerary(itineraryCopy);
  }

  return (
    <div className="manage-trip" aria-label={"trip-manager"}>
      <TextField
        title="Name"
        name="title"
        placeholder="Italy"
        value={trip.title}
        onChange={(e: any) => handleChangeTrip(e)}
      />
      <TextField
        title="Introducion (max. 240 characters)"
        name="introduction"
        placeholder="From Rome to Venice..."
        value={trip.introduction}
        onChange={(e: any) => handleChangeTrip(e)}
        size="md"
        textarea
      />
      <TextField
        title="Description"
        name="description"
        placeholder="Discover the wonders of the Roman empire..."
        value={trip.description}
        onChange={(e: any) => handleChangeTrip(e)}
        size="xl"
        textarea
      />
      <TextField
        title="Image"
        name="photo_url"
        placeholder="Image URL"
        value={trip.photo_url}
        onChange={(e: any) => handleChangeTrip(e)}
      />
      <div className="itinerary-container">
        <div className="itinerary-header">
          <div className="itinerary-header-title">Day by day itinerary</div>
          <Button icon={Plus} onClick={() => addDay()} borderless />
        </div>
        {itinerary &&
          itinerary.map((day, index) => (
            <div
              key={`trip-${trip.id}-itinerary-${index}`}
              className="itinerary-body"
              aria-label="itinerary-element"
            >
              <Select
                placeholder="Day"
                name="day"
                selected={day.day}
                onChange={(e: any) => handleChangeItinerary(e, index)}
                elements={itinerary.map((day, i) => {
                  return { value: i + 1, text: i + 1 };
                })}
              />
              <div className="itinerary-texts">
                <TextField
                  placeholder="Location"
                  name="location"
                  value={day.location}
                  onChange={(e: any) => handleChangeItinerary(e, index)}
                />
                <TextField
                  placeholder="Description"
                  name="description"
                  value={day.description}
                  onChange={(e: any) => handleChangeItinerary(e, index)}
                  size="lg"
                  textarea
                />
              </div>
            </div>
          ))}
      </div>
      <div style={{ maxWidth: 160 }}>
        <Button
          value="Save"
          type="black"
          size="md"
          onClick={() => props.saveCard({ ...trip, itinerary: itinerary })}
        />
      </div>
    </div>
  );
};

export default TripManage;
