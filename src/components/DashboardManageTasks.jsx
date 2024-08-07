import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  addOneMonthToUnixDate,
  timeDifferenceFromNow,
  unixToDate,
} from "../utils/utils";
import Popup from "./modals/Popup";
import { deleteTaskAPI, getTasksByUser, updateTaskAPI } from "../services/task";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function DashboardManageTasks({
  handleUpdateTask,
  setManageBiddersTaskId,
  setDashboardType,
}) {
  const navigate = useNavigate();
  const { userTasks, setUserTasks, sortedBids } = useContext(UserContext);
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  // const checkExpiration = (createdTime) => {
  //   const currentTime = Date.now() / 1000;
  //   if (currentTime < createdTime) {
  //     return "Expired";
  //   } else {
  //     const expiringDate = addOneMonthToUnixDate(createdTime);
  //     return `Expiring on ${unixToDate(expiringDate)}`;
  //   }
  // };

  const getBidsCount = (taskId) => {
    if (sortedBids[`${taskId}`]) {
      return sortedBids[`${taskId}`].length;
    } else {
      return 0;
    }
  };

  const getAvgBid = (taskId) => {
    let avg = 0;
    if (sortedBids[`${taskId}`]) {
      let total = 0;
      let count = 0;

      sortedBids[`${taskId}`].forEach((bid) => {
        let bidRate = parseInt(bid.bidRate, 10);
        if (!isNaN(bidRate)) {
          total += bidRate;
          count++;
        }
      });

      if (count > 0) {
        avg = total / count;
      }
    }

    return avg;
  };

  const handleDeleteTask = async () => {
    try {
      const deleteTaskResponse = await deleteTaskAPI(taskIdToDelete);
      if (deleteTaskResponse.success) {
        toast.success("Task deleted successfully");
        await getTasks();
      } else {
        toast.error("Failed to delete Task");
      }
      setShowDeleteTaskPopup(false);
      setTaskIdToDelete(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  const getTasks = async () => {
    // fetch tasks
    try {
      const tasksResult = await getTasksByUser();
      if (tasksResult?.success && tasksResult?.tasks) {
        setUserTasks([...tasksResult?.tasks]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinishTask = async (taskId) => {
    try {
      const response = await updateTaskAPI({ status: "finished" }, taskId);
      if (response.success) {
        toast.success("Task has been marked as finished");
        await getTasks();
      } else {
        toast.error("Failed to mark task as finished");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark task as finished");
    }
  };

  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>Manage Tasks</h3>
        </div>

        {/* <!-- Row --> */}
        <div class="row">
          {/* <!-- Dashboard Box --> */}
          <div class="col-xl-12">
            <div class="dashboard-box margin-top-0">
              {/* <!-- Headline --> */}
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-assignment"></i> My Tasks
                </h3>
              </div>

              <div class="content">
                <ul class="dashboard-box-list">
                  {userTasks?.length > 0 &&
                    userTasks.map((task) => {
                      if (task?.status === "finished") return <></>;
                      return (
                        <li>
                          {/* <!-- Job Listing --> */}
                          <div class="job-listing width-adjustment">
                            {/* <!-- Job Listing Details --> */}
                            <div class="job-listing-details">
                              {/* <!-- Details --> */}
                              <div class="job-listing-description">
                                <h3 class="job-listing-title">
                                  <a href="#">{task.title}</a>{" "}
                                  {task?.requiredSkills?.split(",")?.length &&
                                    task?.requiredSkills
                                      ?.split(",")
                                      ?.map((tag) => (
                                        <span class="dashboard-status-button yellow">
                                          {tag}
                                        </span>
                                      ))}
                                </h3>

                                {/* <!-- Job Listing Footer --> */}
                                <div class="job-listing-footer">
                                  <ul>
                                    <li>
                                      <i class="icon-material-outline-access-time"></i>{" "}
                                      {`Updated on ${timeDifferenceFromNow(
                                        task?.createdAt
                                      )}`}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Task Details --> */}
                          {task?.status === "new" && (
                            <ul class="dashboard-task-info">
                              <li>
                                <strong>{getBidsCount(task._id)}</strong>
                                <span>Bids</span>
                              </li>
                              <li>
                                <strong>{`$${getAvgBid(task._id)}`}</strong>
                                <span>Avg. Bid</span>
                              </li>
                              <li>
                                <strong>{`$${task.budget}`}</strong>
                                <span>
                                  {task.type === "hourly"
                                    ? "Hourly rate"
                                    : "Fixed price"}
                                </span>
                              </li>
                            </ul>
                          )}

                          {/* <!-- Buttons --> */}
                          <div class="buttons-to-right always-visible">
                            {task?.status === "new" && (
                              <a
                                onClick={() => {
                                  setManageBiddersTaskId(task._id);
                                  setDashboardType("managebidders");
                                }}
                                class="button ripple-effect white-text-button"
                              >
                                <i class="icon-material-outline-supervisor-account"></i>{" "}
                                Manage Bidders{" "}
                                <span class="button-info">
                                  {getBidsCount(task._id)}
                                </span>
                              </a>
                            )}
                            {task?.status === "in-progress" && (
                              <a
                                onClick={() => {
                                  handleFinishTask(task._id);
                                }}
                                class="button ripple-effect white-text-button"
                              >
                                {/* <i class="icon-material-outline-supervisor-account"></i>{" "} */}
                                Mark as finished{" "}
                                {/* <span class="button-info">
                                  {getBidsCount(task._id)}
                                </span> */}
                              </a>
                            )}
                            <a
                              onClick={() => {
                                handleUpdateTask(task);
                              }}
                              class="button gray ripple-effect ico"
                              title="Edit"
                              data-tippy-placement="top"
                            >
                              <i class="icon-feather-edit"></i>
                            </a>
                            <a
                              onClick={() => {
                                setTaskIdToDelete(task._id);
                                setShowDeleteTaskPopup(true);
                              }}
                              class="button gray ripple-effect ico"
                              title="Remove"
                              data-tippy-placement="top"
                            >
                              <i class="icon-feather-trash-2"></i>
                            </a>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Row / End --> */}

        {/* <!-- Footer --> */}
        <div class="dashboard-footer-spacer"></div>
        <div class="small-footer margin-top-15">
          <div class="small-footer-copyrights">
            ©2024 <strong>Bid Bridge</strong>. All Rights Reserved.
          </div>
          <ul class="footer-social-links">
            <li>
              <a href="#" title="Facebook" data-tippy-placement="top">
                <i class="icon-brand-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Twitter" data-tippy-placement="top">
                <i class="icon-brand-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Google Plus" data-tippy-placement="top">
                <i class="icon-brand-google-plus-g"></i>
              </a>
            </li>
            <li>
              <a href="#" title="LinkedIn" data-tippy-placement="top">
                <i class="icon-brand-linkedin-in"></i>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        {/* <!-- Footer / End --> */}
      </div>
      <Popup
        show={showDeleteTaskPopup}
        title={"Delete Task"}
        description={"Are you sure you want to delete task?"}
        okButtonText={"Delete"}
        closeButtonText={"Cancel"}
        handleOk={handleDeleteTask}
        handleClose={() => setShowDeleteTaskPopup(false)}
      />
    </div>
  );
}
export default DashboardManageTasks;
