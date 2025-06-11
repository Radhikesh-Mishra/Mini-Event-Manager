import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const EventPage = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/getEvent/${id}`);
        setEvent(res.data.event);
        setAttendees(res.data.attendees);
      } catch (err) {
        console.error("Error loading event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p className="p-4">Loading event...</p>;

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-50 py-10 px-4 md:px-16">
        {/* Event Details */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-10 w-full">
          <h1 className="text-3xl font-bold text-red-600 mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><strong>📍 Location:</strong> {event.location}</p>
            <p><strong>📅 Date:</strong> {event.date}</p>
          </div>
        </div>

        {/* Attendees Table */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Attendees List</h2>
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, index) => (
                <tr key={attendee._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{attendee.name}</td>
                  <td className="py-3 px-4">{attendee.email}</td>
                  <td className="py-3 px-4">{attendee.phone}</td>
                </tr>
              ))}
              {attendees.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No attendees yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
