import React from "react";
import Card from "./Card";

const Cards = ({ events, onView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <Card key={index} event={event} onView={onView} />
      ))}
    </div>
  );
};

export default Cards;
