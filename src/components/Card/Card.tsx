import React from "react";
import "./Card.css";
import TextLink from "../TextLink/TextLink";
import { TravelPlan } from "../../App";

type CardProps = {
  trip: TravelPlan;
  onOpen: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const Card = (props: CardProps) => {
  return (
    <div className="card" aria-label="card">
      <img
        className="card-image"
        src={
          props.trip.photo_url
            ? props.trip.photo_url
            : "https://a.cdn-hotels.com/gdcs/production82/d1923/447a348f-f875-4885-b00a-e9a90603fef5.jpg"
        }
        alt={props.trip.title}
      />
      <div className="card-body">
        <div className="card-title">{props.trip.title}</div>
        <div className="card-description">{props.trip.introduction}</div>
        <div className="card-footer">
          <TextLink
            text="See trip details"
            onClick={() => props.onOpen(props.trip.id)}
          />
          <div className="card-btn-group">
            <TextLink text="Edit" onClick={() => props.onEdit(props.trip.id)} />
            <TextLink
              text="Delete"
              type="error"
              onClick={() => props.onDelete(props.trip.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
