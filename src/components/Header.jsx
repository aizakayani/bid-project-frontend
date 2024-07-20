import logo from "../utils/images/logo.png";
import userAvatarSmall3 from "../utils/images/user-avatar-small-03.jpg";
import userAvatarSmall2 from "../utils/images/user-avatar-small-02.jpg";
import userAvatarSmall1 from "../utils/images/Svgs/no-avatar-image.svg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { jwtDecode } from "jwt-decode";
import { getJobs, getJobsByUser } from "../services/job";
import { isTokenValid, timeDifferenceFromNow } from "../utils/utils";
import { getTasks, getTasksByUser } from "../services/task";
import io from "socket.io-client";
import {
  getEmployersAPI,
  getFreelancersAPI,
  getUserDetailsAPI,
  updateUserAPI,
  updateUserNotificationsStatus,
} from "../services/user";
import UserRolePopup from "./modals/UserRolePopup";
import { getJobsApplicationsByUser } from "../services/job-applications";
import { getBidsByUserAPI } from "../services/bids";
import { getNotesAPI } from "../services/notes";
import { getFreelancerDetails, getJobDetails } from "../utils/common";
function Header() {
  const {
    user,
    setUser,
    setIsLoggedIn,
    isLoggedIn,
    setUserJobs,
    setUserTasks,
    jobsList,
    setJobsList,
    tasksList,
    setTasksList,
    socket,
    setSocket,
    setUserJobApplications,
    freelancers,
    setFreelancers,
    setUserBids,
    setChatConversations,
    setEmployers,
    setNotes,
    chatConversations,
    setDashboardScreen
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userRolePopup, setUserRolePopup] = useState(false);
  const [initialize, setInitialize] = useState(false);

  const sortedConversations = chatConversations?.length > 0 ? chatConversations?.sort((a, b) => {
    // Extract the last message's createdAt timestamp for both conversations
    const lastMessageA = a.messages[a.messages.length - 1]?.createdAt;
    const lastMessageB = b.messages[b.messages.length - 1]?.createdAt;

    // Compare the timestamps for sorting
    return lastMessageB - lastMessageA;
  }) : [];

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    let token = queryParameters.get("token");
    if (!token) {
      token = localStorage.getItem("token");
    } else {
      localStorage.setItem("token", token);
    }
    if (token) {
      const decodedToken = jwtDecode(token);
      const userData = {
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
        _id: decodedToken.id,
      };
      setUser(userData);
      setIsLoggedIn(true);
      // if user has logged in from third party authentication
      if (!decodedToken?.role) {
        // open popup
        setUserRolePopup(true);
      }
    }
  }, []);

  useEffect(() => {
    initializerWithoutLogin();
    if (!isLoggedIn || !user?.role) return;
    initializer(user?.role);
  }, [isLoggedIn, user?.role]);

  useEffect(() => {
    if (!user?._id) return;
    if (socket) return;
    const newSocket = io("http://localhost:3000", {
      query: { userId: user?._id },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Chat socket connected");
      // fetch chat history
      newSocket.emit("chat-history");
    });

    newSocket.on("chat-message", (conversation) => {
      // console.log("lalalalla", chatConversations);
      // let chatConversationsCopy = [...chatConversations];
      // const index = chatConversationsCopy.findIndex(
      //   (obj) => obj.channel === conversation.channel
      // );

      // if (index !== -1) {
      //   // Update existing object
      //   chatConversationsCopy[index] = conversation;
      // } else {
      //   // Add new object
      //   chatConversationsCopy.push(conversation);
      // }
      // console.log("HIIII", chatConversationsCopy);
      // setChatConversations([...chatConversationsCopy]);
      setChatConversations((prevChatConversations) => {
        let chatConversationsCopy = [...prevChatConversations];
        const index = chatConversationsCopy.findIndex(
          (obj) => obj.channel === conversation.channel
        );

        if (index !== -1) {
          // Update existing object
          chatConversationsCopy[index] = conversation;
        } else {
          // Add new object
          chatConversationsCopy.push(conversation);
        }
        return chatConversationsCopy;
      });
    });

    newSocket.on("chat-history", (conversations) => {
      setChatConversations([...conversations]);
    });

    newSocket.on("fetch-notifications", () => {
      getUserDetails();
    });

    // return () => newSocket.close();
  }, [user?._id]);

  const initializer = async (userRole) => {
    // get user
    await getUserDetails();
    if (userRole === "freelancer") {
      await getJobApplicationsByUser();
      await getBidsByUser();
    } else if (userRole === "employer") {
      await getUserJobs();
      await getUserTasks();
    }
  };

  const initializerWithoutLogin = async () => {
    if (!initialize) {
      setInitialize(true);
      await getAllJobs();
      await getAllTasks();
      await getFreelancers();
      await getEmployers();
      await getNotes();
    }
  };

  const getUserDetails = async () => {
    // fetch jobs
    try {
      const response = await getUserDetailsAPI();
      if (response?.success && response?.user) {
        setUser({ ...response?.user });
      } else {
        if (!isTokenValid(response)) {
          navigate("/");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserJobs = async () => {
    // fetch jobs
    try {
      const jobsResult = await getJobsByUser();
      if (jobsResult?.success && jobsResult?.jobs?.length > 0) {
        setUserJobs([...jobsResult?.jobs]);
      } else {
        if (!isTokenValid(jobsResult)) {
          navigate("/");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTasks = async () => {
    // fetch jobs
    try {
      const tasksResult = await getTasksByUser();
      if (tasksResult?.success && tasksResult?.tasks?.length > 0) {
        setUserTasks([...tasksResult?.tasks]);
      } else {
        if (!isTokenValid(tasksResult)) {
          navigate("/");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getJobApplicationsByUser = async () => {
    try {
      const response = await getJobsApplicationsByUser();
      if (response?.success && response?.jobApplications) {
        setUserJobApplications(response?.jobApplications);
      } else {
        if (!isTokenValid(response)) {
          navigate("/");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getBidsByUser = async () => {
    try {
      const response = await getBidsByUserAPI();
      if (response?.success && response?.bids) {
        setUserBids(response?.bids);
      } else {
        if (!isTokenValid(response)) {
          navigate("/");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllJobs = async () => {
    // fetch jobs
    try {
      const jobsResult = await getJobs();
      if (jobsResult?.success && jobsResult?.jobs?.length > 0) {
        setJobsList([...jobsResult?.jobs]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async () => {
    // fetch jobs
    try {
      const tasksResult = await getTasks();
      if (tasksResult?.success && tasksResult?.tasks?.length > 0) {
        setTasksList([...tasksResult?.tasks]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFreelancers = async () => {
    // fetch jobs
    try {
      const response = await getFreelancersAPI();
      if (response?.success && response?.freelancers?.length > 0) {
        setFreelancers([...response?.freelancers]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployers = async () => {
    // fetch jobs
    try {
      const response = await getEmployersAPI();
      if (response?.success && response?.employers?.length > 0) {
        setEmployers([...response?.employers]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const response = await getNotesAPI();
      if (response.success) {
        setNotes(response.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useeffect");
    const documentId = document.getElementById("header-widget");
    console.log(documentId);
    documentId?.addEventListener(
      "click",
      (event) => handleDocumentClick(event),
      false
    );
    return () => {
      documentId?.removeEventListener(
        "click",
        (event) => handleDocumentClick(event),
        false
      );
    };
  }, [showMessagesDropdown, showNotificationsDropdown]);

  const handleDocumentClick = (event) => {
    console.log({ event });
    if (showMessagesDropdown) {
      if (event.target.classList.contains("icon-feather-mail")) {
        setShowMessagesDropdown(true);
      } else {
        setShowMessagesDropdown(false);
      }
    } else if (showNotificationsDropdown) {
      if (event.target.classList.contains("icon-feather-bell")) {
        showNotificationsDropdown(true);
      } else {
        showNotificationsDropdown(false);
      }
    }
  };

  const handleSelectRole = async (role) => {
    // update user api call\
    // fetch jobs
    try {
      const payload = {
        role,
      };
      const updateResult = await updateUserAPI(payload);
      if (updateResult?.success && updateResult?.updatedToken) {
        localStorage.setItem("token", updateResult?.updatedToken);
        const decodedToken = jwtDecode(updateResult?.updatedToken);
        const userData = {
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
          _id: decodedToken.id,
        };
        setUser(userData);
      } else {
        if (!isTokenValid(updateResult)) {
          navigate("/");
          setIsLoggedIn(false);
        }
      }
      setUserRolePopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationsStatusUpdate = async () => {
    try {
      if (user?.data?.notifications && user?.data?.notifications.filter(notification => notification.isRead === false).length) {
        const response = await updateUserNotificationsStatus();
        if (response.success) {
          await getUserDetails();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header id="header-container" class="fullwidth">
        {/* <!-- Header --> */}
        <div id="header">
          <div class="container">
            {/* <!-- Left Side Content --> */}
            <div class="left-side">
              {/* <!-- Logo --> */}
              <div id="logo">
                <a onClick={() => navigate("/")}>
                  <img src={logo} alt="" />
                </a>
              </div>
              {isLoggedIn && (
                <nav id="navigation">
                  <ul id="responsive">
                    <li>
                      <a onClick={() => navigate("/")}>Home</a>
                    </li>

                    {user?.role === "freelancer" && (
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "32px",
                        }}
                      >
                        <a href="#">Find Work</a>
                        <ul class="dropdown-nav">
                          <li>
                            <a onClick={() => navigate("/jobs")}>Browse Jobs</a>
                          </li>
                          <li>
                            <a onClick={() => navigate("/tasks")}>Browse Tasks</a>
                          </li>
                        </ul>
                      </li>
                    )}

                    {user?.role === "employer" && (
                      <li>
                        <a onClick={() => navigate("/freelancers")}>
                          Find a Freelancer
                        </a>
                      </li>
                    )}
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "30px",
                      }}
                    >
                      <li>
                        <a onClick={() => navigate("/blog")}>Blog</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/pricing")}>Pricing Plans</a>
                      </li>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
            {/* <!-- Left Side Content / End --> */}

            {/* <!-- Right Side Content / End --> */}
            <div class="right-side">
              {/* <!-- Main Navigation --> */}
              {!isLoggedIn && (
                <nav id="navigation">
                  <ul id="responsive">
                    <li>
                      <a onClick={() => navigate("/")}>Home</a>
                    </li>

                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "32px",
                      }}
                    >
                      <a href="#">Find Work</a>
                      <ul class="dropdown-nav">
                        <li>
                          <a onClick={() => navigate("/jobs")}>Browse Jobs</a>
                        </li>
                        <li>
                          <a onClick={() => navigate("/tasks")}>Browse Tasks</a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a onClick={() => navigate("/freelancers")}>
                        Find a Freelancer
                      </a>
                    </li>

                    {isLoggedIn && (
                      <li>
                        <a href="#">More</a>
                        <ul class="dropdown-nav">
                          <li>
                            <ul class="dropdown-nav">
                              <li>
                                <a
                                  onClick={() => {
                                    navigate("/jobDetails");
                                  }}
                                >
                                  Job Page
                                </a>
                              </li>

                              <li>
                                <a
                                  onClick={() => {
                                    navigate("/Contact");
                                  }}
                                >
                                  Contact
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => {
                                    navigate("/JobListLayout");
                                  }}
                                >
                                  Job-List
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a onClick={() => navigate("/blog")}>Blog</a>
                          </li>
                          <li>
                            <a onClick={() => navigate("/pricing")}>
                              Pricing Plans
                            </a>
                          </li>
                        </ul>
                      </li>
                    )}

                    {!isLoggedIn && (
                      <li>
                        <a href="#">What We Are</a>
                      </li>
                    )}
                    {!isLoggedIn && (
                      <li>
                        <a onClick={() => navigate("/contact")}>Contact Us</a>
                      </li>
                    )}
                  </ul>
                </nav>
              )}

              {/* <!-- Main Navigation / End --> */}
              {!isLoggedIn && (
                <div class="login-button">
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    class="button ripple-effect"
                  >
                    Login
                  </button>
                </div>
              )}
              <div class="clearfix"></div>
            </div>
            {isLoggedIn && (
              <div class="right-side-notifications">
                {/* <!--  User Notifications --> */}
                <div class="header-widget hide-on-mobile">
                  {/* <!-- Notifications --> */}
                  <div class="header-notifications" id={"notification"}>
                    {/* <!-- Trigger --> */}
                    <div
                      class="header-notifications-trigger"
                      id={"notification-icon"}
                      style={{ cursor: "pointer" }}
                    >
                      <a
                        onClick={() => {
                          setShowNotificationsDropdown(
                            !showNotificationsDropdown
                          );
                          setShowMessagesDropdown(false);
                          setShowProfileDropdown(false);
                          if (!showNotificationsDropdown) {
                            handleNotificationsStatusUpdate();
                          }
                        }}
                      >
                        <i class="icon-feather-bell"></i>
                        {user?.data?.notifications && <span>{user?.data?.notifications?.filter(notification => notification.isRead === false).length}</span>}
                      </a>
                    </div>

                    {/* <!-- Dropdown --> */}
                    <div
                      class={
                        showNotificationsDropdown
                          ? "header-notifications-dropdown-active"
                          : "header-notifications-dropdown"
                      }
                    >
                      <div class="header-notifications-headline">
                        <h4>Notifications</h4>
                        <button
                          class="mark-as-read ripple-effect-dark"
                          title="Mark all as read"
                          data-tippy-placement="left"
                        >
                          <i class="icon-feather-check-square"></i>
                        </button>
                      </div>

                      <div class="header-notifications-content">
                        <div class="header-notifications-scroll" data-simplebar>
                          <ul>
                            {/* <!-- Notification --> */}
                            {user?.data?.notifications?.length > 0 && user?.data?.notifications.map(notification => {
                              if (notification.type === "job-application") {
                                const jobDetails = getJobDetails(notification?.jobId, jobsList);
                                const applicantDetails = getFreelancerDetails(notification?.applicantId, freelancers);
                                if (!jobDetails || !applicantDetails) return <></>
                                return (
                                  <li class="notifications-not-read">
                                    <a onClick={() => { navigate("/dashboard"); setDashboardScreen("managecandidates") }}>
                                      <span class="notification-icon">
                                        <i class="icon-material-outline-group"></i>
                                      </span>
                                      <span class="notification-text">
                                        <strong>{applicantDetails.name}</strong> applied for a
                                        job{" "}
                                        <span class="color">
                                          {jobDetails.title}
                                        </span>
                                      </span>
                                    </a>
                                  </li>
                                )
                              } else if (notification.type === "place-bid") {
                                const taskDetails = getJobDetails(notification?.taskId, tasksList);
                                const bidderDetails = getFreelancerDetails(notification?.bidderId, freelancers);
                                if (!taskDetails || !bidderDetails) return <></>
                                return (
                                  <li>
                                    <a onClick={() => { navigate("/dashboard"); setDashboardScreen("managebidders") }}>
                                      <span class="notification-icon">
                                        <i class=" icon-material-outline-gavel"></i>
                                      </span>
                                      <span class="notification-text">
                                        <strong>{bidderDetails.name}</strong> placed a bid on
                                        your{" "}
                                        <span class="color">{taskDetails.title}</span>{" "}
                                        project
                                      </span>
                                    </a>
                                  </li>
                                )
                              } else if (notification.type === "accept-bid") {
                                const taskDetails = getJobDetails(notification?.taskId, tasksList);
                                if (!taskDetails) return <></>
                                return (
                                  <li>
                                    <a onClick={() => { navigate("/dashboard"); setDashboardScreen("activebids") }}>
                                      <span class="notification-icon">
                                        <i class=" icon-material-outline-gavel"></i>
                                      </span>
                                      <span class="notification-text">
                                        Your bid on Task{" "}
                                        <span class="color">{taskDetails.title}</span>{" "}
                                        got accepted
                                      </span>
                                    </a>
                                  </li>
                                )
                              }
                            })}

                            {/* <!-- Notification --> */}
                            {/* <li>
                            <a href="dashboard-manage-jobs.html">
                              <span class="notification-icon">
                                <i class="icon-material-outline-autorenew"></i>
                              </span>
                              <span class="notification-text">
                                Your job listing{" "}
                                <span class="color">
                                  Full Stack PHP Developer
                                </span>{" "}
                                is expiring.
                              </span>
                            </a>
                          </li> */}

                            {/* <!-- Notification --> */}
                            {/* <li>
                            <a href="dashboard-manage-candidates.html">
                              <span class="notification-icon">
                                <i class="icon-material-outline-group"></i>
                              </span>
                              <span class="notification-text">
                                <strong>Sindy Forrest</strong> applied for a job{" "}
                                <span class="color">
                                  Full Stack Software Engineer
                                </span>
                              </span>
                            </a>
                          </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Messages --> */}
                  <div class="header-notifications">
                    <div
                      class="header-notifications-trigger"
                      id={"mail-icon"}
                      style={{ cursor: "pointer" }}
                    >
                      <a
                        onClick={() => {
                          setShowMessagesDropdown(!showMessagesDropdown);
                          setShowNotificationsDropdown(false);
                          setShowProfileDropdown(false);
                        }}
                      >
                        <i class="icon-feather-mail"></i>
                        {/* <span>3</span> */}
                      </a>
                    </div>

                    {/* <!-- Dropdown --> */}
                    <div
                      class={
                        showMessagesDropdown
                          ? "header-notifications-dropdown-active"
                          : "header-notifications-dropdown"
                      }
                    >
                      <div class="header-notifications-headline">
                        <h4>Messages</h4>
                        <button
                          class="mark-as-read ripple-effect-dark"
                          title="Mark all as read"
                          data-tippy-placement="left"
                        >
                          <i class="icon-feather-check-square"></i>
                        </button>
                      </div>

                      <div class="header-notifications-content">
                        <div class="header-notifications-scroll" data-simplebar>
                          <ul>
                            {/* <!-- Notification --> */}
                            {sortedConversations?.length > 0 && sortedConversations?.map(conversation => {
                              const lastMessage = conversation.messages[conversation.messages.length - 1];
                              if (lastMessage?.sentBy === user._id) return <></>
                              const receiver = conversation?.recepients.find(recepient => recepient.id !== user._id);
                              return (<li class="notifications-not-read">
                                <a href="dashboard-messages.html">
                                  <span class="notification-avatar status-online">
                                    <img src={receiver?.avatar
                                      ? `data:${receiver?.avatar?.contentType};base64,${receiver?.avatar?.base64Image}`
                                      : userAvatarSmall3} alt="" />
                                  </span>
                                  <div class="notification-text">
                                    <strong>{receiver.name}</strong>
                                    <p class="notification-msg-text">
                                      {lastMessage.content}
                                    </p>
                                    <span class="color">{timeDifferenceFromNow(lastMessage.createdAt)}</span>
                                  </div>
                                </a>
                              </li>)
                            })}
                          </ul>
                        </div>
                      </div>

                      <a
                        onClick={() => {
                          navigate("/dashboard");
                          setDashboardScreen("messages")
                        }}
                        class="header-notifications-button ripple-effect button-sliding-icon"
                      >
                        View All Messages
                        <i class="icon-material-outline-arrow-right-alt"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!--  User Notifications / End --> */}

                {/* <!-- User Menu --> */}
                <div class="header-widget">
                  {/* <!-- Messages --> */}
                  <div class="header-notifications user-menu">
                    <div class="header-notifications-trigger">
                      <a>
                        <div
                          class="user-avatar status-online"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log("avatar");
                            setShowProfileDropdown(!showProfileDropdown);
                            setShowMessagesDropdown(false);
                            setShowNotificationsDropdown(false);
                          }}
                        >
                          <img
                            src={
                              user?.avatar?.contentType &&
                                user?.avatar?.base64Image
                                ? `data:${user?.avatar?.contentType};base64,${user?.avatar?.base64Image}`
                                : userAvatarSmall1
                            }
                            alt=""
                          />
                        </div>
                      </a>
                    </div>

                    {/* <!-- Dropdown --> */}
                    {showProfileDropdown && (
                      <div
                        class={
                          showProfileDropdown
                            ? "header-notifications-dropdown-active"
                            : "header-notifications-dropdown"
                        }
                      >
                        {/* <!-- User Status --> */}
                        <div class="user-status">
                          {/* <!-- User Name / Avatar --> */}
                          <div class="user-details">
                            <div class="user-avatar status-online">
                              <img
                                src={
                                  user?.avatar?.contentType &&
                                    user?.avatar?.base64Image
                                    ? `data:${user?.avatar?.contentType};base64,${user?.avatar?.base64Image}`
                                    : userAvatarSmall1
                                }
                                alt=""
                              />
                            </div>
                            <div class="user-name">
                              {user?.name} <span>{user?.role}</span>
                            </div>
                          </div>

                          {/* <!-- User Status Switcher --> */}
                          {/* <div class="status-switch" id="snackbar-user-status"> */}
                          {/* <label class="user-online current-status">
                            Online
                          </label>
                          <label class="user-invisible">Invisible</label> */}
                          {/* <!-- Status Indicator --> */}
                          {/* <span
                            class="status-indicator"
                            aria-hidden="true"
                          ></span> */}
                          {/* </div> */}
                        </div>

                        <ul class="user-menu-small-nav">
                          <li>
                            <a
                              onClick={() => {
                                navigate("/dashboard");
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <i class="icon-material-outline-dashboard"></i>{" "}
                              Dashboard
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                navigate("/dashboard");
                                setDashboardScreen("settings")
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <i class="icon-material-outline-settings"></i>{" "}
                              Settings
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                                setIsLoggedIn(false)
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <i class="icon-material-outline-power-settings-new"></i>{" "}
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* <!-- User Menu / End -->

<!-- Mobile Navigation Button --> */}
                {/* <span class="mmenu-trigger">
                <button class="hamburger hamburger--collapse" type="button">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </button>
              </span> */}
              </div>
            )}
          </div>
        </div>
        {/* <div class="clearfix"></div> */}
        {/* <!-- Header Container / End --> */}\{" "}
        {userRolePopup && <UserRolePopup handleSelectRole={handleSelectRole} />}
      </header>
      <div className="navigation-small-screen" style={{ display: 'none' }}>
        <nav id="navigation">
          <ul >
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>

            {user?.role === "freelancer" && (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "32px",
                }}
              >
                <a href="#">Find Work</a>
                <ul class="dropdown-nav">
                  <li>
                    <a onClick={() => navigate("/jobs")}>Browse Jobs</a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/tasks")}>Browse Tasks</a>
                  </li>
                </ul>
              </li>
            )}

            {user?.role === "employer" && (
              <li>
                <a onClick={() => navigate("/freelancers")}>
                  Find a Freelancer
                </a>
              </li>
            )}
            <li
              style={{
                display: "flex",
                alignItems: "center",
                height: "30px",
              }}
            >
              <li>
                <a onClick={() => navigate("/blog")}>Blog</a>
              </li>
              <li>
                <a onClick={() => navigate("/pricing")}>Pricing Plans</a>
              </li>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Header;
