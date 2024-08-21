import { useContext, useEffect, useState } from "react";
import EditPopup from "./modals/EditPopup";
import LeavePopup from "./modals/LeavePopup";
import { UserContext } from "../context/userContext";
import { getFreelancerDetails } from "../utils/common";
import { getFreelancersAPI, updateUserAPI } from "../services/user";
import { getTasksByUser, updateTaskAPI } from "../services/task";
import toast from "react-hot-toast";
import { unixToDate } from "../utils/utils";

function DashboardFreelancerReviews() {
  const { userTasks, freelancers, bids, setUserTasks, setFreelancers } =
    useContext(UserContext);
  const [freelancerReviews, setFreelancerReviews] = useState([]);
  const [leaveFreelancerReviewPopup, setLeaveFreelancerReviewPopup] =
    useState(false);
  const [freelancerReviewData, setFreelancerReviewData] = useState(null);
  useEffect(() => {
    if (userTasks?.length > 0 && freelancers?.length > 0 && bids?.length > 0) {
      const finishedTasks = userTasks?.filter(
        (task) => task.status === "finished"
      );
      if (finishedTasks?.length) {
        const reviewsCopy = [];
        finishedTasks.forEach((task) => {
          const bidDetails = bids.find((bid) => bid._id === task.acceptedBid);
          if (bidDetails?.userId) {
            const freelancerDetails = getFreelancerDetails(
              bidDetails?.userId,
              freelancers
            );
            if (freelancerDetails) {
              const payload = {
                taskId: task._id,
                taskTitle: task.title,
                reviewDetails: task.review,
                name: freelancerDetails.name,
              };
              reviewsCopy.push({ ...payload });
            }
          }
        });
        setFreelancerReviews([...reviewsCopy]);
      }
    }
  }, [userTasks, freelancers]);

  const handleAddOrUpdateTaskReview = async (data) => {
    try {
      const response = await updateTaskAPI(
        {
          review: { ...data },
        },
        freelancerReviewData?.taskId
      );
      if (response?.success) {
        await getTasks();
        await getFreelancers();
        toast.success("Review added successfully");
      }
      setLeaveFreelancerReviewPopup(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add review");
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

  return (
    <>
      <div class="dashboard-content-container" data-simplebar>
        <div class="dashboard-content-inner">
          {/* <!-- Dashboard Headline --> */}
          <div class="dashboard-headline">
            <h3>Reviews</h3>
          </div>

          {/* <!-- Row --> */}
          <div class="row">
            {/* <!-- Dashboard Box --> */}
            <div class="col-xl-6">
              <div class="dashboard-box margin-top-0">
                {/* <!-- Headline --> */}
                <div class="headline">
                  <h3>
                    <i class="icon-material-outline-face"></i> Rate Freelancers
                  </h3>
                </div>

                <div class="content">
                  <ul class="dashboard-box-list">
                    {freelancerReviews?.length > 0 &&
                      freelancerReviews?.map((review) => {
                        return (
                          <li>
                            <div class="boxed-list-item">
                              {/* <!-- Content --> */}
                              <div class="item-content">
                                <h4>{review?.taskTitle}</h4>
                                {!review?.reviewDetails && (
                                  <span class="company-not-rated margin-bottom-5">
                                    Not Rated
                                  </span>
                                )}
                                {review?.reviewDetails && (
                                  <div class="item-details margin-top-10">
                                    <div
                                      class="star-rate"
                                      data-rating={review?.reviewDetails?.rating?.toString()}
                                    >
                                      {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                          key={index}
                                          className={`star ${
                                            index <
                                            review?.reviewDetails?.rating
                                              ? "filled"
                                              : "empty"
                                          }`}
                                        ></span>
                                      ))}
                                    </div>

                                    <div class="detail-item">
                                      <i class="icon-material-outline-date-range"></i>{" "}
                                      {unixToDate(
                                        review?.reviewDetails?.createdAt
                                      )}
                                    </div>
                                  </div>
                                )}
                                {review?.reviewDetails && (
                                  <div class="item-description">
                                    <p>
                                      {review?.reviewDetails?.comment
                                        ? review?.reviewDetails?.comment
                                        : ""}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {!review?.reviewDetails && (
                              <a
                                class="popup-with-zoom-anim button ripple-effect margin-top-5 margin-bottom-10 white-text-button"
                                onClick={() => {
                                  setLeaveFreelancerReviewPopup(true);
                                  setFreelancerReviewData(review);
                                }}
                              >
                                <i class="icon-material-outline-thumb-up"></i>{" "}
                                Leave a Review
                              </a>
                            )}
                            {review?.reviewDetails && (
                              <a
                                class="popup-with-zoom-anim button gray ripple-effect margin-top-5 margin-bottom-10"
                                onClick={() => {
                                  setLeaveFreelancerReviewPopup(true);
                                  setFreelancerReviewData(review);
                                }}
                              >
                                <i class="icon-feather-edit"></i> Edit Review
                              </a>
                            )}
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
      </div>
      {leaveFreelancerReviewPopup && (
        <LeavePopup
          show={leaveFreelancerReviewPopup}
          handleClose={() => setLeaveFreelancerReviewPopup(false)}
          handleSubmit={handleAddOrUpdateTaskReview}
          reviewData={freelancerReviewData}
        />
      )}
    </>
  );
}
export default DashboardFreelancerReviews;
