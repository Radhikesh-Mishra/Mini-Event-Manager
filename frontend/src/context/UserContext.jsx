// src/context/UserContext.js
import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user data in memory

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy usage
export const useUser = () => useContext(UserContext);
