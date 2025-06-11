import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Cards from "../components/Cards";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });
  const [user, setUser] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    console.log("Logged in user:", storedUser);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:9000/getEvents");
        setEvents(res.data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/uploadEvent", eventData);
      setEvents([...events, res.data.event]);
      setShowModal(false);
      setEventData({ title: "", description: "", location: "", date: "" });
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  const handleViewEvent = async (id) => {
    try {
      await axios.get(`http://localhost:9000/getEvent/${id}`);
      navigate(`/event/${id}`);
    } catch (error) {
      console.error("Error viewing event:", error);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <h1 className="px-8 pt-4 text-3xl text-center text-gray-600">
        Welcome, <span className="font-semibold">{user?.name || "Guest"}</span>
      </h1>

      <div className="flex justify-between items-center px-6 mt-6">
        <button
          onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow"
        >
          {viewMode === "card" ? "Show Table View" : "Show Card View"}
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Event
        </button>
      </div>

      <div className="p-6">
        {viewMode === "card" ? (
          <Cards events={events} onView={handleViewEvent} />
        ) : (
          <Table events={events} onView={handleViewEvent} />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["title", "location", "date"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "date" ? "date" : "text"}
                    name={field}
                    value={eventData[field]}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter ${field}`}
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={4}
                  placeholder="Enter event description"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Submit Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
