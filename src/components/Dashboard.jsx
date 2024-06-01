import { useState } from "react";
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

function Dashboard() {
  const [dashboardType, setDashboardType] = useState("main");
  const [jobMenuOpen, setJobMenuOpen] = useState(false);
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);
  const [updateJobData, setUpdateJobData] = useState(null);
  const [updateTaskData, setUpdateTaskData] = useState(null);
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
                          <li>
                            <a onClick={() => setDashboardType("managetasks")}>
                              Manage Tasks <span class="nav-tag">2</span>
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => setDashboardType("managebidders")}
                            >
                              Manage Bidders
                            </a>
                          </li>
                          <li>
                            <a onClick={() => setDashboardType("activebids")}>
                              My Active Bids <span class="nav-tag">4</span>
                            </a>
                          </li>
                          <li>
                            <a onClick={() => setDashboardType("posttask")}>
                              Post a Task
                            </a>
                          </li>
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
                      <a onClick={() => setDashboardType("main")}>
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
        {dashboardType === "managecandidates" && <DashboardManageCandidates />}
        {dashboardType === "postjob" && (
          <DashboardPostJob
            updateJobData={updateJobData}
            setUpdateJobData={setUpdateJobData}
          />
        )}
        {dashboardType === "managetasks" && (
          <DashboardManageTasks handleUpdateTask={handleUpdateTask} />
        )}
        {dashboardType === "managebidders" && <DashboardManageBidders />}
        {dashboardType === "activebids" && <DashboardMyActiveBids />}
        {dashboardType === "posttask" && (
          <DashboardPostTask
            updateTaskData={updateTaskData}
            setUpdateTaskData={setUpdateTaskData}
          />
        )}
        {/* <!-- Dashboard Content / End --> */}
      </div>
    </>
  );
}
export default Dashboard;
