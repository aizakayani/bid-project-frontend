import { useContext, useEffect, useState } from "react";
import DashboardMain from "./DashboardMain";
import DashboardMessages from "./DashboardMessages";
import DashboardBookmarks from "./DashboardBookmarks";
import DashboardReviews from "./DashboardReviews";
import DashboardSettings from "./DashboardSettings";
import DashboardManageJobs from "./DashboardManageJobs";
import DashboardManageCandidates from "./DashboardManageCandidates";
import DashboardPostJob from "./DashboardPostJob";
import DashboardManageTasks from "./DashboardManageTasks";
import DashboardManageBidders from "./DashboardManageBidders";
import DashboardMyActiveBids from "./DashboardMyActiveBids";
import DashboardPostTask from "./DashboardPostTask";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { getJobsApplicationsByJobIds } from "../services/job-applications";
import { getBidsByTaskIds } from "../services/bids";
function Dashboard() {
  const {
    user,
    userJobs,
    userTasks,
    setJobApplications,
    setBids,
    setSortedBids,
    jobsList
  } = useContext(UserContext);
  const [dashboardType, setDashboardType] = useState("main");
  const [jobMenuOpen, setJobMenuOpen] = useState(false);
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);
  const [updateJobData, setUpdateJobData] = useState(null);
  const [updateTaskData, setUpdateTaskData] = useState(null);
  const [manageBiddersTaskId, setManageBiddersTaskId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (userJobs?.length > 0) {
      // get JobIds
      const jobIds = userJobs.map((job) => job._id);
      getJobApplications(jobIds);
    }
  }, [userJobs?.length]);

  useEffect(() => {
    if (userTasks?.length > 0) {
      // get JobIds
      const taskIds = userTasks.map((task) => task._id);
      getTaskBids(taskIds);
    }
  }, [userTasks?.length]);

  const getJobApplications = async (jobIds) => {
    // fetch jobs
    try {
      const jobApplicationsResult = await getJobsApplicationsByJobIds(jobIds);
      if (
        jobApplicationsResult?.success &&
        jobApplicationsResult?.jobApplications?.length > 0
      ) {
        setJobApplications([...jobApplicationsResult?.jobApplications]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskBids = async (taskIds) => {
    // fetch jobs
    try {
      const bidsResult = await getBidsByTaskIds(taskIds);
      if (bidsResult?.success && bidsResult?.bids?.length > 0) {
        setBids([...bidsResult?.bids]);
        // sort bids with task id
        const sortedBidsWithTaskId = {};
        bidsResult?.bids?.forEach((bid) => {
          if (sortedBidsWithTaskId[`${bid.taskId}`]?.length) {
            sortedBidsWithTaskId[`${bid.taskId}`].push(bid);
          } else {
            sortedBidsWithTaskId[`${bid.taskId}`] = [bid];
          }
          setSortedBids({ ...sortedBidsWithTaskId });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateJob = (jobData) => {
    setUpdateJobData(jobData);
    setDashboardType("postjob");
  };
  const handleUpdateTask = (taskData) => {
    setUpdateTaskData(taskData);
    setDashboardType("posttask");
  };
  return (
    <>
      <div class="clearfix"></div>
      <div class="dashboard-container">
        {/* <!-- Dashboard Sidebar
	================================================== --> */}
        <div class="dashboard-sidebar">
          <div class="dashboard-sidebar-inner" data-simplebar>
            <div class="dashboard-nav-container">
              {/* <!-- Responsive Navigation Trigger --> */}
              <a href="#" class="dashboard-responsive-nav-trigger">
                <span class="hamburger hamburger--collapse">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </span>
                <span class="trigger-title">Dashboard Navigation</span>
              </a>

              {/* <!-- Navigation --> */}
              <div class="dashboard-nav">
                <div class="dashboard-nav-inner">
                  <ul data-submenu-title="Start">
                    <li class="active">
                      <a onClick={() => setDashboardType("main")}>
                        <i class="icon-material-outline-dashboard"></i>{" "}
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setDashboardType("messages")}>
                        <i class="icon-material-outline-question-answer"></i>{" "}
                        Messages <span class="nav-tag">2</span>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setDashboardType("bookmarks")}>
                        <i class="icon-material-outline-star-border"></i>{" "}
                        Bookmarks
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setDashboardType("reviews")}>
                        <i class="icon-material-outline-rate-review"></i>{" "}
                        Reviews
                      </a>
                    </li>
                  </ul>

                  <ul data-submenu-title="Organize and Manage">
                    {user?.role === "employer" && (
                      <li>
                        <a
                          href="#"
                          onClick={() => setJobMenuOpen(!jobMenuOpen)}
                          className="job-task-menu"
                        >
                          <i class="icon-material-outline-business-center"></i>{" "}
                          Jobs
                        </a>
                        {jobMenuOpen && (
                          <ul>
                            <li>
                              <a onClick={() => setDashboardType("managejobs")}>
                                Manage Jobs <span class="nav-tag">3</span>
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  setDashboardType("managecandidates")
                                }
                              >
                                Manage Candidates
                              </a>
                            </li>
                            <li>
                              <a onClick={() => setDashboardType("postjob")}>
                                Post a Job
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>
                    )}
                    <li>
                      <a
                        href="#"
                        onClick={() => setTaskMenuOpen(!taskMenuOpen)}
                        className="job-task-menu"
                      >
                        <i class="icon-material-outline-assignment"></i> Tasks
                      </a>
                      {taskMenuOpen && (
                        <ul>
                          {user?.role === "employer" && (
                            <li>
                              <a
                                onClick={() => setDashboardType("managetasks")}
                              >
                                Manage Tasks{" "}
                                <span class="nav-tag">{userTasks?.length}</span>
                              </a>
                            </li>
                          )}
                          {user?.role === "employer" && (
                            <li>
                              <a
                                onClick={() =>
                                  setDashboardType("managebidders")
                                }
                              >
                                Manage Bidders
                              </a>
                            </li>
                          )}
                          {user?.role === "freelancer" && (
                            <li>
                              <a onClick={() => setDashboardType("activebids")}>
                                My Active Bids <span class="nav-tag">4</span>
                              </a>
                            </li>
                          )}
                          {user?.role === "employer" && (
                            <li>
                              <a onClick={() => setDashboardType("posttask")}>
                                Post a Task
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  </ul>

                  <ul data-submenu-title="Account">
                    <li>
                      <a onClick={() => setDashboardType("settings")}>
                        <i class="icon-material-outline-settings"></i> Settings
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate("/jobs");
                        }}
                      >
                        <i class="icon-material-outline-power-settings-new"></i>{" "}
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- Navigation / End --> */}
            </div>
          </div>
        </div>
        {/* <!-- Dashboard Sidebar / End --> */}

        {/* <!-- Dashboard Content
	================================================== --> */}
        {dashboardType === "main" && <DashboardMain />}
        {dashboardType === "messages" && <DashboardMessages />}
        {dashboardType === "bookmarks" && <DashboardBookmarks />}
        {dashboardType === "reviews" && <DashboardReviews />}
        {dashboardType === "settings" && <DashboardSettings />}
        {dashboardType === "managejobs" && (
          <DashboardManageJobs handleUpdateJob={handleUpdateJob} />
        )}
        {dashboardType === "managecandidates" && (
          <DashboardManageCandidates setDashboardType={setDashboardType} />
        )}
        {dashboardType === "postjob" && (
          <DashboardPostJob
            updateJobData={updateJobData}
            setUpdateJobData={setUpdateJobData}
          />
        )}
        {dashboardType === "managetasks" && (
          <DashboardManageTasks
            handleUpdateTask={handleUpdateTask}
            setManageBiddersTaskId={setManageBiddersTaskId}
            setDashboardType={setDashboardType}
          />
        )}
        {dashboardType === "managebidders" && (
          <DashboardManageBidders
            manageBiddersTaskId={manageBiddersTaskId}
            setManageBiddersTaskId={setManageBiddersTaskId}
          />
        )}
        {dashboardType === "activebids" && <DashboardMyActiveBids />}
        {dashboardType === "posttask" && (
          <DashboardPostTask
            updateTaskData={updateTaskData}
            setUpdateTaskData={setUpdateTaskData}
            setDashboardType={setDashboardType}
          />
        )}
        {/* <!-- Dashboard Content / End --> */}
      </div>
    </>
  );
}
export default Dashboard;
