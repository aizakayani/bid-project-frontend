import userAvatarBig1 from "../utils/images/user-avatar-big-01.jpg";
import userAvatarBig2 from "../utils/images/user-avatar-big-02.jpg";
import gb from "../utils/images/flags/gb.svg";
import de from "../utils/images/flags/de.svg";
import pl from "../utils/images/flags/pl.svg";
import it from "../utils/images/flags/it.svg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import singleTask from "../utils/images/single-task.jpg";
import browseCompanies2 from "../utils/images/browse-companies-02.png";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { timeDifferenceFromNow } from "../utils/utils";
import { addBidAPI, getBidsByUserAPI } from "../services/bids";
import toast from "react-hot-toast";
import { updateUserAPI } from "../services/user";
function TaskDetails() {
  const { id } = useParams();
  const { tasksList, userBids, setUserBids, user, setUser } =
    useContext(UserContext);
  const [taskDetails, setTaskDetails] = useState(null);
  const [bidRate, setBidRate] = useState("");
  const [selectedDeliveryTime, setSelectedDeliveryTime] =
    useState("less-three");
  const [applied, setApplied] = useState(false);
  const [bookmarkedTasks, setBookmarkedTasks] = useState([]);
  useEffect(() => {
    console.log(userBids, id);
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
    if (user?.data?.bookmarkedTasks) {
      setBookmarkedTasks([...user?.data?.bookmarkedTasks]);
    }
  }, [user?.data]);

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
  return (
    <>
      <div class="single-page-header" data-background-image={singleTask}>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="single-page-header-inner">
                <div class="left-side">
                  <div class="header-image">
                    <a href="single-company-profile.html">
                      <img src={browseCompanies2} alt="" />
                    </a>
                  </div>
                  <div class="header-details">
                    <h3>{taskDetails?.title}</h3>
                    <h5>About the Employer</h5>
                    <ul>
                      <li>
                        <a href="single-company-profile.html">
                          <i class="icon-material-outline-business"></i> Acue
                        </a>
                      </li>
                      <li>
                        <div class="star-rating" data-rating="5.0">
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                        </div>
                      </li>
                      <li>
                        <img class="flag" src={de} alt="" /> Germany
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
              <div class="boxed-list-headline">
                <h3>
                  <i class="icon-material-outline-group"></i> Freelancers
                  Bidding
                </h3>
              </div>
              <ul class="boxed-list-ul">
                <li>
                  <div class="bid">
                    {/* <!-- Avatar --> */}
                    <div class="bids-avatar">
                      <div class="freelancer-avatar">
                        <div class="verified-badge"></div>
                        <a href="single-freelancer-profile.html">
                          <img src={userAvatarBig1} alt="" />
                        </a>
                      </div>
                    </div>

                    {/* <!-- Content --> */}
                    <div class="bids-content">
                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="single-freelancer-profile.html">
                            Tom Smith{" "}
                            <img
                              class="flag"
                              src={gb}
                              alt=""
                              title="United Kingdom"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        <div class="star-rating" data-rating="4.9">
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Bid --> */}
                    <div class="bids-bid">
                      <div class="bid-rate">
                        <div class="rate">$4,400</div>
                        <span>in 7 days</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="bid">
                    {/* <!-- Avatar --> */}
                    <div class="bids-avatar">
                      <div class="freelancer-avatar">
                        <div class="verified-badge"></div>
                        <a href="single-freelancer-profile.html">
                          <img src={userAvatarBig2} alt="" />
                        </a>
                      </div>
                    </div>

                    {/* <!-- Content --> */}
                    <div class="bids-content">
                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="single-freelancer-profile.html">
                            David Peterson{" "}
                            <img
                              class="flag"
                              src={de}
                              alt=""
                              title="Germany"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        <div class="star-rating" data-rating="4.2">
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Bid --> */}
                    <div class="bids-bid">
                      <div class="bid-rate">
                        <div class="rate">$2,200</div>
                        <span>in 14 days</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="bid">
                    {/* <!-- Avatar --> */}
                    <div class="bids-avatar">
                      <div class="freelancer-avatar">
                        <a href="single-freelancer-profile.html">
                          <img src={userAvatarPlaceholder} alt="" />
                        </a>
                      </div>
                    </div>

                    {/* <!-- Content --> */}
                    <div class="bids-content">
                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="single-freelancer-profile.html">
                            Marcin Kowalski{" "}
                            <img
                              class="flag"
                              src={pl}
                              alt=""
                              title="Poland"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        <span class="not-rated">
                          Minimum of 3 votes required
                        </span>
                      </div>
                    </div>

                    {/* <!-- Bid --> */}
                    <div class="bids-bid">
                      <div class="bid-rate">
                        <div class="rate">$3,800</div>
                        <span>In 20 days</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="bid">
                    {/* <!-- Avatar --> */}
                    <div class="bids-avatar">
                      <div class="freelancer-avatar">
                        <a href="single-freelancer-profile.html">
                          <img src={userAvatarPlaceholder} alt="" />
                        </a>
                      </div>
                    </div>

                    {/* <!-- Content --> */}
                    <div class="bids-content">
                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="single-freelancer-profile.html">
                            Sebastiano Piccio{" "}
                            <img
                              class="flag"
                              src={it}
                              alt=""
                              title="Italy"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        <div class="star-rating" data-rating="4.5">
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Bid --> */}
                    <div class="bids-bid">
                      <div class="bid-rate">
                        <div class="rate">$3,400</div>
                        <span>In 10 days</span>
                      </div>
                    </div>
                  </div>
                </li>
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
                      href="#sign-in-dialog"
                      class="register-tab sign-in popup-with-zoom-anim"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- Sidebar Widget --> */}
              <div class="sidebar-widget">
                <h3>Bookmark or Share</h3>

                {/* <!-- Bookmark Button --> */}
                <button
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
                </button>

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
                <div class="share-buttons margin-top-25">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
