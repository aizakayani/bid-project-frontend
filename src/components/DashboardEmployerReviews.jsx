import { useContext, useEffect, useState } from "react";
import LeavePopup from "./modals/LeavePopup";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";
import { getEmployerDetails, getTaskDetails } from "../utils/common";
import { getBidsByUserAPI, updateBidAPI } from "../services/bids";
import { unixToDate } from "../utils/utils";

function DashboardEmployerReviews() {
  const { userBids, tasksList, employers, setUserBids } =
    useContext(UserContext);
  const [employerReviews, setEmployerReviews] = useState([]);
  const [leaveEmployerReviewPopup, setLeaveEmployerReviewPopup] =
    useState(false);
  const [employerReviewData, setEmployerReviewData] = useState(null);

  useEffect(() => {
    console.log(userBids, employers, tasksList);
    if (
      userBids?.length > 0 &&
      employers?.length > 0 &&
      tasksList?.length > 0
    ) {
      const filteredTasks = tasksList?.filter(
        (task) => task.status === "finished"
      );
      console.log("filteredTasks", filteredTasks);
      if (filteredTasks?.length) {
        const reviewsCopy = [];
        filteredTasks.forEach((task) => {
          const bidDetails = userBids.find(
            (bid) => bid._id === task.acceptedBid
          );
          console.log("bidDetails", bidDetails);
          if (bidDetails?.userId) {
            const taskDetails = getTaskDetails(bidDetails.taskId, tasksList);
            console.log("taskDetails", taskDetails);
            if (taskDetails) {
              const employerDetails = getEmployerDetails(
                taskDetails?.userId,
                employers
              );
              if (employerDetails) {
                const payload = {
                  bidId: bidDetails._id,
                  taskTitle: taskDetails.title,
                  reviewDetails: bidDetails.review,
                  name: employerDetails.name,
                };
                reviewsCopy.push({ ...payload });
              }
            }
          }
        });
        setEmployerReviews([...reviewsCopy]);
      }
    }
  }, [userBids, employers, tasksList]);

  const handleAddOrUpdateReview = async (data) => {
    try {
      const response = await updateBidAPI(
        {
          review: { ...data },
        },
        employerReviewData?.bidId
      );
      if (response?.success) {
        await getBids();
        toast.success("Review added successfully");
      }
      setLeaveEmployerReviewPopup(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add review");
    }
  };

  const getBids = async () => {
    // fetch bids
    try {
      const response = await getBidsByUserAPI();
      if (response?.success && response?.bids) {
        setUserBids([...response?.bids]);
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
                    <i class="icon-material-outline-business"></i> Rate
                    Employers
                  </h3>
                </div>

                <div class="content">
                  <ul class="dashboard-box-list">
                    {employerReviews?.length > 0 &&
                      employerReviews?.map((review) => {
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
                                      class="star-rating"
                                      data-rating={review?.reviewDetails?.rating?.toString()}
                                    >
                                      <span class="star"></span>
                                      <span class="star"></span>
                                      <span class="star"></span>
                                      <span class="star"></span>
                                      <span class="star"></span>
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
                                class="popup-with-zoom-anim button ripple-effect margin-top-5 margin-bottom-10"
                                onClick={() => {
                                  setLeaveEmployerReviewPopup(true);
                                  setEmployerReviewData(review);
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
                                  setLeaveEmployerReviewPopup(true);
                                  setEmployerReviewData(review);
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

              {/* <!-- Pagination --> */}
              {/* <div class="clearfix"></div>
            <div class="pagination-container margin-top-40 margin-bottom-0">
              <nav class="pagination">
                <ul>
                  <li>
                    <a href="#" class="ripple-effect current-page">
                      1
                    </a>
                  </li>
                  <li>
                    <a href="#" class="ripple-effect">
                      2
                    </a>
                  </li>
                  <li>
                    <a href="#" class="ripple-effect">
                      3
                    </a>
                  </li>
                  <li class="pagination-arrow">
                    <a href="#" class="ripple-effect">
                      <i class="icon-material-outline-keyboard-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="clearfix"></div> */}
              {/* <!-- Pagination / End --> */}
            </div>

            {/* <!-- Dashboard Box --> */}
            <div class="col-xl-6"></div>
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
      {leaveEmployerReviewPopup && (
        <LeavePopup
          show={leaveEmployerReviewPopup}
          handleClose={() => setLeaveEmployerReviewPopup(false)}
          handleSubmit={handleAddOrUpdateReview}
          reviewData={employerReviewData}
        />
      )}
    </>
  );
}
export default DashboardEmployerReviews;
