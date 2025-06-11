import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/home">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">
            Mini Event Manager
          </h1>
        </a>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
