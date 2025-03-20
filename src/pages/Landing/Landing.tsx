import React, { useEffect, useState } from "react";
import { TravelPlan } from "../../App";
import Button from "../../components/Button/Button";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import SearchBar from "../../components/SearchBar/SearchBar";
import TripManage from "../TripManage/TripManage";
import TripDetails from "../TripDetails/TripDetails";
import "./Landing.css";
import logo from "../../icons/Favicon.png";

const Landing = () => {
  const [travels, setTravels] = useState<TravelPlan[]>([]);
  const [defaultTravels, setDefaultTravels] = useState<TravelPlan[]>([]);
  const [openedTrip, setOpenedTrip] = useState<TravelPlan>({
    id: 0,
    title: "",
    introduction: "",
    description: "",
    itinerary: [],
    photo_url: "",
    status: "todo",
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const getTravels = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels"
      );
      const jsonData = await response.json();
      setTravels(jsonData);
      setDefaultTravels(jsonData);
    };

    getTravels();
  }, []);

  function search(text: string) {
    const filteredTravels = travels.filter((travel) => {
      const searchText = text.toLowerCase();
      return (
        travel.title.toLowerCase().includes(searchText) ||
        travel.description.toLowerCase().includes(searchText) ||
        travel.introduction.toLowerCase().includes(searchText) ||
        travel.itinerary.some((item) =>
          item.description.toLowerCase().includes(searchText)
        )
      );
    });

    setTravels(filteredTravels);
  }

  function filter(filteredBy: string) {
    filteredBy === "all"
      ? setTravels(defaultTravels)
      : setTravels(
          defaultTravels.filter((travel) => travel.status === filteredBy)
        );
  }

  function createCard(trip: TravelPlan) {
    const travelsList = [...defaultTravels];
    travelsList.push({
      ...trip,
      id: defaultTravels.length + 1,
      status: "todo",
    });
    setDefaultTravels(travelsList);
    setTravels(travelsList);
    setIsCreateOpen(false);
  }

  function saveCard(trip: TravelPlan) {
    const travelsList = [...defaultTravels];
    const index = travelsList.findIndex((travel) => travel.id === trip.id);
    travelsList[index] = trip;
    setDefaultTravels(travelsList);
    setTravels(travelsList);
    setIsEditOpen(false);
  }

  function markAsCompleted(trip: TravelPlan) {
    const travelsList = [...defaultTravels];
    const index = travelsList.findIndex((travel) => travel.id === trip.id);
    travelsList[index] = trip;
    setDefaultTravels(travelsList);
    setTravels(travelsList);
  }

  function openCardDetails(id: number) {
    const index = defaultTravels.findIndex((travel) => travel.id === id);
    setOpenedTrip(defaultTravels[index]);
    setIsDetailsOpen(true);
  }

  function openEditCard(id: number) {
    const index = defaultTravels.findIndex((travel) => travel.id === id);
    setOpenedTrip(defaultTravels[index]);
    setIsEditOpen(true);
  }

  function deleteCard(id: number) {
    const travelsList = [...defaultTravels];
    const index = travelsList.findIndex((travel) => travel.id === id);
    travelsList.splice(index, 1);
    setDefaultTravels(travelsList);
    setTravels(travelsList);
  }

  return (
    <div className="landing" aria-label="landing-page">
      <div className="nav">
        <img className="nav-logo" src={logo} />
        <Button
          value="Create new trip"
          onClick={() => setIsCreateOpen(true)}
          size="md"
        />
      </div>
      <div className="hero">
        <div className="intro">
          <div className="title">The places you dream of</div>
          <div className="subtitle">Let's live new adventures</div>
        </div>
        <SearchBar onSearch={(textSearch: string) => search(textSearch)} />
      </div>

      <div className="card-list">
        <ButtonGroup
          buttons={[
            { value: "All", onClick: () => filter("all") },
            { value: "Upcoming", onClick: () => filter("todo") },
            { value: "Completed", onClick: () => filter("done") },
          ]}
        />

        {travels &&
          travels.map((travel: TravelPlan) => {
            return (
              <Card
                key={`card-${travel.id}`}
                trip={{ ...travel }}
                onOpen={(id: number) => openCardDetails(id)}
                onEdit={(id: number) => openEditCard(id)}
                onDelete={(id: number) => deleteCard(id)}
              />
            );
          })}
        <Modal
          headerImage={openedTrip?.photo_url}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        >
          <TripDetails
            trip={openedTrip}
            markAsCompleted={(trip: TravelPlan) => markAsCompleted(trip)}
          />
        </Modal>
        <Modal
          headerText="Edit a trip"
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        >
          <TripManage
            trip={openedTrip}
            saveCard={(trip: TravelPlan) => saveCard(trip)}
          />
        </Modal>
        <Modal
          headerText="Create a trip"
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        >
          <TripManage saveCard={(trip: TravelPlan) => createCard(trip)} />
        </Modal>
      </div>
    </div>
  );
};

export default Landing;
