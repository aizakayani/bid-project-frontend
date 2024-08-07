import userAvatarBig2 from "../utils/images/user-avatar-big-02.jpg";
import de from "../utils/images/flags/de.svg";
import sk from "../utils/images/flags/sk.svg";
import pl from "../utils/images/flags/pl.svg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  getCountryFlag,
  getDeliveryTime,
  getFreelancerDetails,
  getTaskDetails,
} from "../utils/common";
import { getTasksByUser, updateTaskAPI } from "../services/task";
import toast from "react-hot-toast";
function DashboardManageBidders({
  manageBiddersTaskId,
  setManageBiddersTaskId,
  setDashboardType,
}) {
  const {
    userTasks,
    sortedBids,
    freelancers,
    setNewMessageContext,
    setUserTasks,
  } = useContext(UserContext);
  const [selectedTask, setSelectedTask] = useState(userTasks[0]?._id || "");

  useEffect(() => {
    if (manageBiddersTaskId) {
      setSelectedTask(manageBiddersTaskId);
      setManageBiddersTaskId(null);
    }
  }, []);

  const handleAcceptOffer = async (bidId, taskId) => {
    try {
      const response = await updateTaskAPI(
        { acceptedBid: bidId, status: "in-progress" },
        taskId
      );
      if (response.success) {
        toast.success("Offer accepted for bid");
        await getTasks();
      } else {
        toast.error("Failed to accept offer");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept offer");
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

  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>Manage Bidders</h3>
          {userTasks?.length > 0 &&
            userTasks?.filter((task) => task.status === "new").length > 0 && (
              <span class="margin-top-7">
                Bids for{" "}
                <select
                  class="selectpicker with-border"
                  data-size="7"
                  onChange={(e) => {
                    setSelectedTask(e.target.value);
                  }}
                  value={selectedTask}
                >
                  {userTasks?.length > 0 &&
                    userTasks?.map((task) => {
                      if (task.status === "new")
                        return <option value={task._id}>{task.title}</option>;
                    })}
                </select>
              </span>
            )}
        </div>

        {/* <!-- Row --> */}
        <div class="row">
          {/* <!-- Dashboard Box --> */}
          <div class="col-xl-12">
            <div class="dashboard-box margin-top-0">
              {/* <!-- Headline --> */}
              <div class="headline">
                {getTaskDetails(selectedTask, userTasks)?.status === "new" && (
                  <h3>
                    <i class="icon-material-outline-supervisor-account"></i>{" "}
                    {sortedBids[selectedTask]?.length}
                  </h3>
                )}
                {/* <div class="sort-by">
                  <select class="selectpicker hide-tick">
                    <option>Highest First</option>
                    <option>Lowest First</option>
                    <option>Fastest First</option>
                  </select>
                </div> */}
              </div>

              <div class="content">
                {sortedBids[selectedTask]?.length > 0 &&
                  getTaskDetails(selectedTask, userTasks)?.status === "new" && (
                    <ul class="dashboard-box-list">
                      {sortedBids[selectedTask]?.map((bid) => {
                        const freelancerDetails = getFreelancerDetails(
                          bid.userId,
                          freelancers
                        );
                        console.log({freelancerDetails});
                        return (
                          <li>
                            {/* <!-- Overview --> */}
                            <div class="freelancer-overview manage-candidates">
                              <div class="freelancer-overview-inner">
                                {/* <!-- Avatar --> */}
                                <div class="freelancer-avatar">
                                  {/* <div class="verified-badge"></div> */}
                                  <a href="#">
                                    <img
                                      src={
                                        freelancerDetails?.avatar
                                          ? `data:${freelancerDetails?.avatar?.contentType};base64,${freelancerDetails?.avatar?.base64Image}`
                                          : userAvatarBig2
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>

                                {/* <!-- Name --> */}
                                <div class="freelancer-name">
                                  <h4>
                                    <a href="#">
                                      {freelancerDetails?.name || "Bidder"}{" "}
                                      {freelancerDetails?.data?.location && (
                                        <img
                                          class="flag"
                                          src={getCountryFlag(
                                            freelancerDetails?.data?.location
                                          )}
                                          alt=""
                                          title="Germany"
                                          data-tippy-placement="top"
                                        />
                                      )}
                                    </a>
                                  </h4>

                                  {/* <!-- Details --> */}

                                  {freelancerDetails?.email && (
                                    <span class="freelancer-detail-item">
                                      <a href="#">
                                        <i class="icon-feather-mail"></i>{" "}
                                        {freelancerDetails?.email}
                                      </a>
                                    </span>
                                  )}

                                  {/* <!-- Rating --> */}
                                  <div class="freelancer-rating">
                                    <div
                                      class="star-rating"
                                      data-rating="5.0"
                                    >
                                      {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                          key={index}
                                          className={`star ${
                                            index <
                                            freelancerDetails?.rating
                                              ? "filled"
                                              : "empty"
                                          }`}
                                        ></span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* <!-- Bid Details --> */}
                                  <ul class="dashboard-task-info bid-info">
                                    <li>
                                      <strong>{`${bid.bidRate}`}</strong>
                                      <span>Fixed Price</span>
                                    </li>
                                    <li>
                                      <strong>
                                        {getDeliveryTime(bid?.deliveryTime)}
                                      </strong>
                                      <span>Delivery Time</span>
                                    </li>
                                  </ul>

                                  {/* <!-- Buttons --> */}
                                  <div class="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                                    <a
                                      href="#small-dialog-1"
                                      class="popup-with-zoom-anim button ripple-effect"
                                      onClick={() =>
                                        handleAcceptOffer(bid._id, bid.taskId)
                                      }
                                    >
                                      <i class="icon-material-outline-check"></i>{" "}
                                      Accept Offer
                                    </a>
                                    <a
                                      href="#small-dialog-2"
                                      class="popup-with-zoom-anim button dark ripple-effect"
                                      onClick={() => {
                                        setNewMessageContext({
                                          receiver: {
                                            id: bid.userId,
                                            name: freelancerDetails?.name,
                                          },
                                        });
                                        setDashboardType("messages");
                                      }}
                                    >
                                      <i class="icon-feather-mail"></i> Send
                                      Message
                                    </a>
                                    {/* <a
                                  href="#"
                                  class="button gray ripple-effect ico"
                                  title="Remove Bid"
                                  data-tippy-placement="top"
                                >
                                  <i class="icon-feather-trash-2"></i>
                                </a> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                {sortedBids[selectedTask]?.length === 0 ||
                  (getTaskDetails(selectedTask, userTasks)?.status !==
                    "new" && <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '40px',
                      color:'#770737',
                    }}>No Bidders Yet</div>)}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Row / End --> */}

        {/* <!-- Footer --> */}
        <div class="dashboard-footer-spacer"></div>
        <div class="small-footer margin-top-15">
          <div class="small-footer-copyrights">
            2024 <strong>Bid Bridge</strong>. All Rights Reserved.
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
    </div>
  );
}
export default DashboardManageBidders;
