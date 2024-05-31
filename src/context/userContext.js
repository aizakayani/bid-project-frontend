import React, { createContext, useState } from "react";

// Create a context with a default value (null in this case)
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userJobs, setUserJobs] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, userJobs, setUserJobs, userTasks, setUserTasks }}>
      {children}
    </UserContext.Provider>
  );
};
