import React, { createContext, useState } from "react";

// Create a context with a default value (null in this case)
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userJobs, setUserJobs] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [chatConversations, setChatConversations] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [userJobApplications, setUserJobApplications] = useState([]);
  const [newMessageContext, setNewMessageContext] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [bids, setBids] = useState([]);
  const [sortedBids, setSortedBids] = useState({});
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        userJobs,
        setUserJobs,
        userTasks,
        setUserTasks,
        jobsList,
        setJobsList,
        tasksList,
        setTasksList,
        jobApplications,
        setJobApplications,
        socket,
        setSocket,
        chatMessages,
        setChatMessages,
        newMessageContext,
        setNewMessageContext,
        userJobApplications,
        setUserJobApplications,
        freelancers,
        setFreelancers,
        userBids,
        setUserBids,
        bids,
        setBids,
        sortedBids,
        setSortedBids,
        chatConversations,
        setChatConversations,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
