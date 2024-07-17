import avatar from '../utils/images/Svgs/no-avatar-image.svg'
import gb from "../utils/images/flags/gb.svg";
import de from "../utils/images/flags/de.svg";
import pl from "../utils/images/flags/pl.svg";
import it from "../utils/images/flags/it.svg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import companyLogo05 from "../utils/images/company-logo-05.png";
import singleTask from "../utils/images/single-task.jpg";
import browseCompanies2 from "../utils/images/browse-companies-02.png";
import { Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { timeDifferenceFromNow } from "../utils/utils";
import { addBidAPI, getBidsByTaskIds, getBidsByUserAPI } from "../services/bids";
import toast from "react-hot-toast";
import { updateUserAPI } from "../services/user";
import { getCountryFlag, getFreelancerDetails } from "../utils/common";
import { useNavigate } from "react-router-dom";
function TaskDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasksList, userBids, setUserBids, user, setUser, freelancers } =
    useContext(UserContext);
  const [taskDetails, setTaskDetails] = useState(null);
  const [bidRate, setBidRate] = useState("");
  const [selectedDeliveryTime, setSelectedDeliveryTime] =
    useState("less-three");
  const [applied, setApplied] = useState(false);
  const [bookmarkedTasks, setBookmarkedTasks] = useState([]);
  const [taskBids, setTaskBids] = useState([]);

  useEffect(() => {
    if (
      userBids?.length &&
      userBids.filter((bid) => bid.taskId === id)?.length
    ) {
      setApplied(true);
    }
  }, [id, userBids?.length]);

  useEffect(() => {
    if (id && tasksList?.length > 0) {
      const filteredTask = tasksList.find((task) => task._id === id);
      if (filteredTask) {
        setTaskDetails(filteredTask);
      }
    }
  }, [id, tasksList]);

  useEffect(() => {
    getTaskBids()
  }, [])

  useEffect(() => {
    if (user?.data?.bookmarkedTasks) {
      setBookmarkedTasks([...user?.data?.bookmarkedTasks]);
    }
  }, [user?.data]);

  const getTaskBids = async () => {
    // fetch jobs
    try {
      const bidsResult = await getBidsByTaskIds([id]);
      if (bidsResult?.success && bidsResult?.bids?.length > 0) {
        setTaskBids([...bidsResult?.bids]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBookmarkedTasks = async (taskId) => {
    const bookmarksCopy = [...bookmarkedTasks];
    const index = bookmarksCopy.indexOf(taskId);

    if (index !== -1) {
      // If jobId exists, remove it from the array
      bookmarksCopy.splice(index, 1);
    } else {
      // If jobId does not exist, add it to the array
      bookmarksCopy.push(taskId);
    }
    // send API call
    try {
      const data = user?.data || {};
      data.bookmarkedTasks =
        bookmarksCopy?.length > 0 ? [...bookmarksCopy] : [];
      const updateResult = await updateUserAPI({ data });
      if (updateResult?.success && updateResult?.user) {
        setUser(updateResult?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddBid = async () => {
    try {
      if (bidRate.trim() === "") {
        toast.error("Please enter bid rate to Place a bid");
        return;
      }
      const payload = {
        bidRate,
        deliveryTime: selectedDeliveryTime,
        taskId: id,
      };
      const response = await addBidAPI(payload);
      if (response?.success) {
        toast.success("Bid sent to employer");
        getBidsByUser();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to place bid");
    }
  };
  const getBidsByUser = async () => {
    try {
      const response = await getBidsByUserAPI();
      if (response?.success && response?.bids) {
        setUserBids(response?.bids);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get user bids");
    }
  };
  const ratingNumber = taskDetails?.review?.rating;
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < ratingNumber) {
      return 'filled';
    } else {
      return 'empty';
    }
  });
  return (
    <>
      <div class="single-page-header" data-background-image={singleTask}>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="single-page-header-inner">
                <div class="left-side">
                  <div class="header-image">
                    <div className="job-listing-company-logo">
                      <img src={singleTask.companyLogo || companyLogo05} alt="" />
                    </div>
                  </div>
                  <div class="header-details">
                    <h3>{taskDetails?.title}</h3>
                    <h5>About the Employer</h5>
                    <ul>
                      <li>
                        <div class="star-rate" data-rating={ratingNumber ?? 0}>
                          {stars.map((starType, index) => (
                            <span key={index} className={`star ${starType}`}></span>
                          ))}
                        </div>
                      </li>
                      <li>
                        <img class="flag" src={getCountryFlag(taskDetails?.location)} />{" "}

                      </li>
                      <li>
                        <div class="verified-badge-with-title">Verified</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="right-side">
                  <div class="salary-box">
                    <div class="salary-type">Project Budget</div>
                    <div class="salary-amount">
                      {taskDetails?.budget + " $"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container margin-bottom-15">
        <div class="row">
          {/* <!-- Content --> */}
          <div class="col-xl-8 col-lg-8 content-right-offset">
            {/* <!-- Description --> */}
            <div class="single-page-section">
              <h3 class="margin-bottom-25">Project Description</h3>
              <p>{taskDetails?.description}</p>
            </div>

            {/* <!-- Atachments --> */}
            {/* <div class="single-page-section">
              <h3>Attachments</h3>
              <div class="attachments-container">
                <a href="#" class="attachment-box ripple-effect">
                  <span>Project Brief</span>
                  <i>PDF</i>
                </a>
              </div>
            </div> */}

            {/* <!-- Skills --> */}
            <div class="single-page-section">
              <h3>Skills Required</h3>
              <div class="task-tags">
                {taskDetails?.requiredSkills?.split(",")?.length > 0 &&
                  taskDetails?.requiredSkills?.split(",")?.map((skill) => {
                    return <span style={{ marginRight: 4 }}>{skill}</span>;
                  })}
              </div>
            </div>
            <div class="clearfix"></div>

            {/* <!-- Freelancers Bidding --> */}
            <div class="boxed-list margin-bottom-60">

              <ul class="boxed-list-ul">
                {taskBids?.length > 0 && taskBids?.map((bid) => {
                  if (bid.taskId !== id || bid.userId === user?._id) return <></>;
                  const freelancerDetails = getFreelancerDetails(
                    bid.userId,
                    freelancers
                  );
                  return (
                    <li>
                      <div class="bid">
                        {/* <!-- Avatar --> */}
                        <div class="bids-avatar">
                          <div class="freelancer-avatar">
                            <div class="verified-badge"></div>
                            <a href="single-freelancer-profile.html">
                            <img src={avatar} alt="" />
                            </a>
                          </div>
                        </div>

                        {/* <!-- Content --> */}
                        <div class="bids-content">
                          {/* <!-- Name --> */}
                          <div class="freelancer-name">
                            <h4>
                              <a href="single-freelancer-profile.html">
                                {freelancerDetails?.name}{" "}
                                <img
                                  class="flag"
                                  src={getCountryFlag(
                                    freelancerDetails?.data?.location
                                  )}
                                  alt=""
                                  data-tippy-placement="top"
                                />
                              </a>
                            </h4>
                            <div class="star-rate" data-rating={ratingNumber ?? 0}>
                          {stars.map((starType, index) => (
                            <span key={index} className={`star ${starType}`}></span>
                          ))}
                        </div>
                          </div>
                        </div>

                        {/* <!-- Bid --> */}
                        <div class="bids-bid">
                          <div class="bid-rate">
                            <div class="rate">{bid?.bidRate}</div>
                            <span>{`${timeDifferenceFromNow(bid?.createdAt)}`}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* <!-- Sidebar --> */}
          <div class="col-xl-4 col-lg-4">
            <div class="sidebar-container">
              <div class="countdown green margin-bottom-35">
                {`${timeDifferenceFromNow(taskDetails?.createdAt)}`}
              </div>

              <div class="sidebar-widget">
                <div class="bidding-widget">
                  <div class="bidding-headline">
                    <h3>Bid on this job!</h3>
                  </div>
                  <div class="bidding-inner">
                    {/* <!-- Headline --> */}
                    <span class="bidding-detail">
                      Set your <strong>minimal rate</strong>
                    </span>

                    {/* <!-- Price Slider --> */}
                    <div class="bidding-value">
                      $<span id="biddingVal"></span>
                    </div>
                    <input
                      class="bidding-slider"
                      type="text"
                      value={bidRate}
                      data-slider-handle="custom"
                      data-slider-currency="$"
                      data-slider-min="2500"
                      data-slider-max="4500"
                      data-slider-value="auto"
                      data-slider-step="50"
                      data-slider-tooltip="hide"
                      onChange={(e) => setBidRate(e.target.value)}
                    />

                    {/* <!-- Headline --> */}
                    <span class="bidding-detail margin-top-30">
                      Set your <strong>delivery time</strong>
                    </span>

                    {/* <!-- Fields --> */}
                    <select
                      class="selectpicker with-border"
                      data-size="7"
                      data-live-search="true"
                      value={selectedDeliveryTime}
                      onChange={(e) => {
                        setSelectedDeliveryTime(e.target.value);
                      }}
                    >
                      <option value={"less-three"}>
                        {"Less than 3 months"}
                      </option>
                      <option value={"three-to-six"}>{"3 to 6 months"}</option>
                      <option value={"more-six"}>{"More than 6 months"}</option>
                    </select>

                    {/* <!-- Button --> */}
                    <button
                      id="snackbar-place-bid"
                      class="button ripple-effect move-on-hover full-width margin-top-30"
                      onClick={handleAddBid}
                      style={
                        applied
                          ? { pointerEvents: "none", cursor: "default" }
                          : {}
                      }
                    >
                      <span>{applied ? "Bid sent" : "Place a Bid"}</span>
                    </button>
                  </div>
                  <div class="bidding-signup">
                    Don't have an account?{" "}
                    <a
                      onClick={() => {
                        navigate("/register");
                      }}
                      style={{ color: "#770737", textDecoration: "underline" , cursor: "pointer" }}
                    >
                      Sign Up!
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- Sidebar Widget --> */}
              {/* <div class="sidebar-widget">
                <h3>Bookmark or Share</h3> */}

                {/* <!-- Bookmark Button --> */}
                {/* <button
                  class="bookmark-button margin-bottom-25"
                  onClick={() => {
                    handleUpdateBookmarkedTasks(taskDetails?._id);
                  }}
                >
                  <span class="bookmark-icon"></span>
                  {!bookmarkedTasks?.includes(taskDetails?._id) && (
                    <span class="bookmark-text">Bookmark</span>
                  )}
                  {!bookmarkedTasks?.includes(taskDetails?._id) && (
                    <span class="bookmarked-text">Bookmarked</span>
                  )}
                </button> */}

                {/* <!-- Copy URL --> */}
                {/* <div class="copy-url">
                  <input
                    id="copy-url"
                    type="text"
                    value=""
                    class="with-border"
                  />
                  <button
                    class="copy-url-button ripple-effect"
                    data-clipboard-target="#copy-url"
                    title="Copy to Clipboard"
                    data-tippy-placement="top"
                  >
                    <i class="icon-material-outline-file-copy"></i>
                  </button>
                </div> */}

                {/* <!-- Share Buttons --> */}
                {/* <div class="share-buttons margin-top-25">
                  <div class="share-buttons-trigger">
                    <i class="icon-feather-share-2"></i>
                  </div>
                  <div class="share-buttons-content">
                    <span>
                      Interesting? <strong>Share It!</strong>
                    </span>
                    <ul class="share-buttons-icons">
                      <li>
                        <a
                          href="#"
                          data-button-color="#3b5998"
                          title="Share on Facebook"
                          data-tippy-placement="top"
                        >
                          <i class="icon-brand-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-button-color="#1da1f2"
                          title="Share on Twitter"
                          data-tippy-placement="top"
                        >
                          <i class="icon-brand-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-button-color="#dd4b39"
                          title="Share on Google Plus"
                          data-tippy-placement="top"
                        >
                          <i class="icon-brand-google-plus-g"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-button-color="#0077b5"
                          title="Share on LinkedIn"
                          data-tippy-placement="top"
                        >
                          <i class="icon-brand-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
