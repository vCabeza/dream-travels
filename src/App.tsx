import React from "react";
import Landing from "./pages/Landing/Landing";
import "./App.css";

export type ItineraryItem = {
  day: number;
  description: string;
  location: string;
};

export type TravelPlan = {
  id: number;
  title: string;
  introduction: string;
  description: string;
  itinerary: ItineraryItem[];
  photo_url: string;
  status: "todo" | "done";
};

function App() {
  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
