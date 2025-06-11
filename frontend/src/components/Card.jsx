import React from "react";
import axios from "axios";

const Card = ({ event, onView }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const isAlreadyRegistered = user?.events?.includes(event._id);

  const handleRegister = async () => {
    try {
      if (!user || !token) {
        return alert("User not logged in!");
      }

      const response = await axios.post(
        `http://localhost:9000/registerEvent/${event._id}`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Registered successfully!");

      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border">
      <h1 className="text-2xl font-bold text-red-600 mb-2">{event.title}</h1>
      <p className="text-sm text-gray-500 mb-1">
        📅 Date: <span className="font-medium">{event.date}</span>
      </p>
      <p className="text-gray-700 mb-3">{event.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        📍 Location: <span className="font-medium">{event.location}</span>
      </p>
      <div className="flex gap-3">
        {!isAlreadyRegistered && (
          <button
            onClick={handleRegister}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Register
          </button>
        )}
        <button
          onClick={() => onView(event._id)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
