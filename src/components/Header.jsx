import logo from "../utils/images/logo.png";
import userAvatarSmall3 from "../utils/images/user-avatar-small-03.jpg";
import userAvatarSmall2 from "../utils/images/user-avatar-small-02.jpg";
import userAvatarSmall1 from "../utils/images/user-avatar-small-01.jpg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { jwtDecode } from "jwt-decode";
import { getJobs, getJobsByUser } from "../services/job";
import { isTokenValid } from "../utils/utils";
import { getTasks, getTasksByUser } from "../services/task";
import io from "socket.io-client";
function Header() {
  const {
    user,
    setUser,
    setIsLoggedIn,
    isLoggedIn,
    setUserJobs,
    setUserTasks,
    setJobsList,
    setTasksList,
    socket,
    setSocket,
    setChatMessages,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    let token = queryParameters.get("token");
    if (!token) {
      token = localStorage.getItem("token");
    }
    if (token) {
      const decodedToken = jwtDecode(token);
      const userData = {
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
        id: decodedToken.id,
      };
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    initializer();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!user?.id) return;
    if (socket) return;
    const newSocket = io("http://localhost:3000", {
      query: { userId: user.id },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Chat socket connected");
      // fetch chat history
      // newSocket.emit("chat-history", {});
    });

    newSocket.on("chat-message", (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on("chat-history", (msgs) => {
      setChatMessages([...msgs]);
    });

    return () => newSocket.close();
  }, [user?.id]);

  const initializer = async () => {
    // if (user.role === "freelancer") {
    await getAllJobs();
    await getUserJobs();
    await getUserTasks();
    await getAllTasks();
    // }
  };

  const getUserJobs = async () => {
    // fetch jobs
    try {
      const jobsResult = await getJobsByUser();
      if (jobsResult?.success && jobsResult?.jobs?.length > 0) {
        setUserJobs([...jobsResult?.jobs]);
      } else {
        if (!isTokenValid(jobsResult)) {
          navigate("/login");
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
          navigate("/login");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllJobs = async () => {
    // fetch jobs
    try {
      const jobsResult = await getJobs();
      if (jobsResult?.success && jobsResult?.jobs?.length > 0) {
        setJobsList([...jobsResult?.jobs]);
      } else {
        if (!isTokenValid(jobsResult)) {
          navigate("/login");
          setIsLoggedIn(false);
        }
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
      } else {
        if (!isTokenValid(tasksResult)) {
          navigate("/login");
          setIsLoggedIn(false);
        }
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
  return (
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

                  <li>
                    <a href="#">Find Work</a>
                    <ul class="dropdown-nav">
                      <li>
                        <a onClick={() => navigate("/jobs")}>Browse Jobs</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/tasks")}>Browse Tasks</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/companies")}>
                          Browse Companies
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a onClick={() => navigate("/freelancers")}>
                      Find a Freelancer
                    </a>
                  </li>
                  <li>
                    <a href="#">More</a>
                    <ul class="dropdown-nav">
                      <li>
                        <a href="#">Open Street Map</a>
                        <ul class="dropdown-nav">
                          <li>
                            <a href="jobs-list-layout-full-page-map-OpenStreetMap.html">
                              {" "}
                              Map
                            </a>
                          </li>
                          <li>
                            <a href="single-job-page-OpenStreetMap.html">
                              Job Page
                            </a>
                          </li>
                          <li>
                            <a href="single-company-profile-OpenStreetMap.html">
                              Company Profile
                            </a>
                          </li>
                          <li>
                            <a href="pages-contact-OpenStreetMap.html">
                              Contact
                            </a>
                          </li>
                          <li>
                            <a href="jobs-list-layout-1-OpenStreetMap.html">
                              Location Autocomplete
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
                      <li>
                        <a onClick={() => navigate("/checkout")}>Checkout</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/invoice")}>
                          Invoice Template
                        </a>
                      </li>
                      <li>
                        <a href="pages-user-interface-elements.html">
                          User Interface Elements
                        </a>
                      </li>
                      <li>
                        <a href="pages-icons-cheatsheet.html">
                          Icons Cheatsheet
                        </a>
                      </li>
                      <li>
                        <a href="pages-login.html">Login & Register</a>
                      </li>
                      <li>
                        <a href="pages-404.html">404 Page</a>
                      </li>
                      <li>
                        <a href="pages-contact.html">Contact</a>
                      </li>
                    </ul>
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

                  <li>
                    <a href="#">Find Work</a>
                    <ul class="dropdown-nav">
                      <li>
                        <a onClick={() => navigate("/jobs")}>Browse Jobs</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/tasks")}>Browse Tasks</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/companies")}>
                          Browse Companies
                        </a>
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
                          <a href="#">Open Street Map</a>
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
                                a
                                onClick={() => {
                                  navigate("/CompanyDetails");
                                }}
                              >
                                Company Profile
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
                        <li>
                          <a onClick={() => navigate("/checkout")}>Checkout</a>
                        </li>
                        <li>
                          <a onClick={() => navigate("/invoice")}>
                            Invoice Template
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
            <div class="right-side">
              {/* <!--  User Notifications --> */}
              <div class="header-widget hide-on-mobile">
                {/* <!-- Notifications --> */}
                <div class="header-notifications" id={"notification"}>
                  {/* <!-- Trigger --> */}
                  <div
                    class="header-notifications-trigger"
                    id={"notification-icon"}
                  >
                    <a
                      onClick={() => {
                        setShowNotificationsDropdown(
                          !showNotificationsDropdown
                        );
                        setShowMessagesDropdown(false);
                      }}
                    >
                      <i class="icon-feather-bell"></i>
                      <span>4</span>
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
                          <li class="notifications-not-read">
                            <a href="dashboard-manage-candidates.html">
                              <span class="notification-icon">
                                <i class="icon-material-outline-group"></i>
                              </span>
                              <span class="notification-text">
                                <strong>Michael Shannah</strong> applied for a
                                job{" "}
                                <span class="color">
                                  Full Stack Software Engineer
                                </span>
                              </span>
                            </a>
                          </li>

                          {/* <!-- Notification --> */}
                          <li>
                            <a href="dashboard-manage-bidders.html">
                              <span class="notification-icon">
                                <i class=" icon-material-outline-gavel"></i>
                              </span>
                              <span class="notification-text">
                                <strong>Gilbert Allanis</strong> placed a bid on
                                your{" "}
                                <span class="color">iOS App Development</span>{" "}
                                project
                              </span>
                            </a>
                          </li>

                          {/* <!-- Notification --> */}
                          <li>
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
                          </li>

                          {/* <!-- Notification --> */}
                          <li>
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
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Messages --> */}
                <div class="header-notifications">
                  <div class="header-notifications-trigger" id={"mail-icon"}>
                    <a
                      onClick={() => {
                        setShowMessagesDropdown(!showMessagesDropdown);
                        setShowNotificationsDropdown(false);
                      }}
                    >
                      <i class="icon-feather-mail"></i>
                      <span>3</span>
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
                          <li class="notifications-not-read">
                            <a href="dashboard-messages.html">
                              <span class="notification-avatar status-online">
                                <img src={userAvatarSmall3} alt="" />
                              </span>
                              <div class="notification-text">
                                <strong>David Peterson</strong>
                                <p class="notification-msg-text">
                                  Thanks for reaching out. I'm quite busy right
                                  now on many...
                                </p>
                                <span class="color">4 hours ago</span>
                              </div>
                            </a>
                          </li>

                          {/* <!-- Notification --> */}
                          <li class="notifications-not-read">
                            <a href="dashboard-messages.html">
                              <span class="notification-avatar status-offline">
                                <img src={userAvatarSmall2} alt="" />
                              </span>
                              <div class="notification-text">
                                <strong>Sindy Forest</strong>
                                <p class="notification-msg-text">
                                  Hi Tom! Hate to break it to you, but I'm
                                  actually on vacation until...
                                </p>
                                <span class="color">Yesterday</span>
                              </div>
                            </a>
                          </li>

                          {/* <!-- Notification --> */}
                          <li class="notifications-not-read">
                            <a href="dashboard-messages.html">
                              <span class="notification-avatar status-online">
                                <img src={userAvatarPlaceholder} alt="" />
                              </span>
                              <div class="notification-text">
                                <strong>Marcin Kowalski</strong>
                                <p class="notification-msg-text">
                                  I received payment. Thanks for cooperation!
                                </p>
                                <span class="color">Yesterday</span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <a
                      href="dashboard-messages.html"
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
                    <a href="#">
                      <div class="user-avatar status-online">
                        <img src={userAvatarSmall1} alt="" />
                      </div>
                    </a>
                  </div>

                  {/* <!-- Dropdown --> */}
                  <div class="header-notifications-dropdown">
                    {/* <!-- User Status --> */}
                    <div class="user-status">
                      {/* <!-- User Name / Avatar --> */}
                      <div class="user-details">
                        <div class="user-avatar status-online">
                          <img src={userAvatarSmall1} alt="" />
                        </div>
                        <div class="user-name">
                          Tom Smith <span>Freelancer</span>
                        </div>
                      </div>

                      {/* <!-- User Status Switcher --> */}
                      <div class="status-switch" id="snackbar-user-status">
                        <label class="user-online current-status">Online</label>
                        <label class="user-invisible">Invisible</label>
                        {/* <!-- Status Indicator --> */}
                        <span
                          class="status-indicator"
                          aria-hidden="true"
                        ></span>
                      </div>
                    </div>

                    <ul class="user-menu-small-nav">
                      <li>
                        <a href="dashboard.html">
                          <i class="icon-material-outline-dashboard"></i>{" "}
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="dashboard-settings.html">
                          <i class="icon-material-outline-settings"></i>{" "}
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="index-logged-out.html">
                          <i class="icon-material-outline-power-settings-new"></i>{" "}
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- User Menu / End -->

<!-- Mobile Navigation Button --> */}
              <span class="mmenu-trigger">
                <button class="hamburger hamburger--collapse" type="button">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </button>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* <div class="clearfix"></div> */}
      {/* <!-- Header Container / End --> */}
    </header>
  );
}
export default Header;
