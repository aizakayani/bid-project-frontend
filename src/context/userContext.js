import React, { createContext, useState } from "react";

// Create a context with a default value (null in this case)
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userJobs, setUserJobs] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, userJobs, setUserJobs }}>
      {children}
    </UserContext.Provider>
  );
};
