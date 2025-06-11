import React from "react";
import axios from "axios";

const Table = ({ events, onView }) => {
   const handleRegister = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !token) {
        return alert("User not logged in!");
      }

      const response = await axios.post(
        `http://localhost:9000/registerEvent/${eventId}`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Registered successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-gray-300 text-left bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Location</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="py-3 px-4 font-semibold text-red-600">{event.title}</td>
              <td className="py-3 px-4">{event.date}</td>
              <td className="py-3 px-4">{event.location}</td>
              <td className="py-3 px-4">{event.description}</td>
              <td className="py-3 px-4 space-x-2">
                <button
                  onClick={() => handleRegister(event._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded"
                >
                  Register
                </button>
                <button
                  onClick={() => onView(event._id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-3 py-1 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
