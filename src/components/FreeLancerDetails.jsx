import singleFreelancer from "../utils/images/single-freelancer.jpg";
import userAvatarBig2 from "../utils/images/user-avatar-big-02.jpg";
import de from "../utils/images/flags/de.svg";
import BrowseCompanies3 from "../utils/images/browse-companies-03.png";
import BrowseCompanies4 from "../utils/images/browse-companies-04.png";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { updateUserAPI } from "../services/user";
import { unixToDate } from "../utils/utils";
import MakeOffer from "./modals/OfferPopup";
function FreeLancerDetails() {
  const { id } = useParams();
  const { freelancers, user, setUser, tasksList, userBids, bids } =
    useContext(UserContext);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const [bookmarkedFreelancers, setBookmarkedFreelancers] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [showOfferPopup,setShowOfferPopup]= useState(false);
  useEffect(() => {
    if (user?.data?.bookmarkedFreelancers) {
      setBookmarkedFreelancers([...user?.data?.bookmarkedFreelancers]);
    }
  }, [user?.data]);

  useEffect(() => {
    if (id && freelancers?.length > 0) {
      const filteredFreelancer = freelancers.find(
        (freelancer) => freelancer?._id === id
      );
      if (filteredFreelancer) {
        console.log(filteredFreelancer);
        setFreelancerDetails(filteredFreelancer);
      }
    }
  }, [id, freelancers]);

  useEffect(() => {
    if (bids?.length > 0 && tasksList?.length > 0) {
      const finishedTasksCopy = [];
      const filteredBids = bids.filter(bid => bid.userId === id);
      if (filteredBids?.length > 0) {
        filteredBids.forEach(bid => {
          const task = tasksList.find(task => task.acceptedBid === bid._id && task.status === "finished");
          console.log("HIIII", task, tasksList, bid);
          if (task && task?.review) {
            finishedTasksCopy.push(task);
          }
        });
        setFinishedTasks([...finishedTasksCopy])
      }
    }
  }, [bids, tasksList]);

  const handleUpdateBookmarkedFreelancers = async (freelancerId) => {
    const bookmarksCopy =
      bookmarkedFreelancers?.length > 0 ? [...bookmarkedFreelancers] : [];
    const index = bookmarksCopy.indexOf(freelancerId);

    if (index !== -1) {
      // If freelancerId exists, remove it from the array
      bookmarksCopy.splice(index, 1);
    } else {
      // If freelancerId does not exist, add it to the array
      bookmarksCopy.push(freelancerId);
    }
    // send API call
    try {
      const data = user?.data || {};
      data.bookmarkedFreelancers =
        bookmarksCopy?.length > 0 ? [...bookmarksCopy] : [];
      const updateResult = await updateUserAPI({ data });
      if (updateResult?.success && updateResult?.user) {
        setUser(updateResult?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ratingNumber = freelancerDetails?.review?.rating;
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < ratingNumber) {
      return 'filled';
    } else {
      return 'empty';
    }
  });

  return (
    <>
      {/* <!-- Titlebar
================================================== --> */}
      <div
        class="single-page-header freelancer-header"
        data-background-image={singleFreelancer}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="single-page-header-inner">
                <div class="left-side">
                  <div class="header-image freelancer-avatar">
                    <img
                      src={
                        freelancerDetails?.avatar?.contentType &&
                          freelancerDetails?.avatar?.base64Image
                          ? `data:${freelancerDetails?.avatar?.contentType};base64,${freelancerDetails?.avatar?.base64Image}`
                          : userAvatarBig2
                      }
                      alt=""
                    />
                  </div>
                  <div class="header-details">
                    <h3>{freelancerDetails?.name}</h3>
                    <ul>
                      <li>
                      <div class="star-rate" data-rating={ratingNumber ?? 0}>
                          {stars.map((starType, index) => (
                            <span key={index} className={`star ${starType}`}></span>
                          ))}
                        </div>
                      </li>
                      {freelancerDetails?.location && (
                        <li>
                          <img class="flag" src={de} alt="" />{" "}
                          {freelancerDetails?.location}
                        </li>
                      )}
                      <li>
                        <div class="verified-badge-with-title">Verified</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Page Content
================================================== --> */}
      <div class="container">
        <div class="row">
          {/* <!-- Content --> */}
          <div class="col-xl-8 col-lg-8 content-right-offset">
            {/* <!-- Page Content --> */}
            <div class="single-page-section">
              <h3 class="margin-bottom-25">About Me</h3>
              <p>{freelancerDetails?.data?.introduction ?? ""}</p>
            </div>

            {/* <!-- Boxed List --> */}
            <div class="boxed-list margin-bottom-60">
              <div class="boxed-list-headline">
                <h3>
                  <i class="icon-material-outline-thumb-up"></i> Work History
                  and Feedback
                </h3>
              </div>
              <ul class="boxed-list-ul">
                {finishedTasks?.length === 0 && <div>No Work History Yet</div>}
                {finishedTasks?.map(task => {
                  return (
                    <li>
                      <div class="boxed-list-item">
                        {/* <!-- Content --> */}
                        <div class="item-content">
                          <h4>
                            {task.title}
                            {/* <span>Rated as Freelancer</span> */}
                          </h4>
                          {task?.review && <div class="item-details margin-top-10">
                            <div class="star-rating" data-rating={task?.review?.rating?.toString()}></div>
                            <div class="detail-item">
                              <i class="icon-material-outline-date-range"></i>{" "}
                              {`${unixToDate(
                                task?.review?.createdAt
                              )}`}
                            </div>
                          </div>}
                          {task?.review?.comment && <div class="item-description">
                            <p>
                              {task?.review?.comment}
                            </p>
                          </div>}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              {/* <!-- Pagination --> */}
              <div class="clearfix"></div>
              {/* <div class="pagination-container margin-top-40 margin-bottom-10">
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
                    <li class="pagination-arrow">
                      <a href="#" class="ripple-effect">
                        <i class="icon-material-outline-keyboard-arrow-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div> */}
              <div class="clearfix"></div>
              {/* <!-- Pagination / End --> */}
            </div>
            {/* <!-- Boxed List / End --> */}

            {/* <!-- Boxed List / End --> */}
          </div>

          {/* <!-- Sidebar --> */}
          <div class="col-xl-4 col-lg-4">
            <div class="sidebar-container">
              {/* <!-- Profile Overview --> */}
              <div class="profile-overview">
                <div class="overview-item">
                  <strong>$35</strong>
                  <span>Hourly Rate</span>
                </div>
                <div class="overview-item">
                  <strong>53</strong>
                  <span>Jobs Done</span>
                </div>
                <div class="overview-item">
                  <strong>22</strong>
                  <span>Rehired</span>
                </div>
              </div>

              {/* <!-- Button --> */}
              <a
                onClick={() => setShowOfferPopup(true)}
                class="apply-now-button popup-with-zoom-anim margin-bottom-50 white-text-button"
              >
                Make an Offer{" "}
                <i class="icon-material-outline-arrow-right-alt"></i>
              </a>

              {/* <!-- Freelancer Indicators --> */}
              <div class="sidebar-widget">
                <div class="freelancer-indicators">
                  {/* <!-- Indicator --> */}
                  <div class="indicator">
                    <strong>88%</strong>
                    <div class="indicator-bar" data-indicator-percentage="88">
                      <span></span>
                    </div>
                    <span>Job Success</span>
                  </div>

                  {/* <!-- Indicator --> */}
                  <div class="indicator">
                    <strong>100%</strong>
                    <div class="indicator-bar" data-indicator-percentage="100">
                      <span></span>
                    </div>
                    <span>Recommendation</span>
                  </div>

                  {/* <!-- Indicator --> */}
                  <div class="indicator">
                    <strong>90%</strong>
                    <div class="indicator-bar" data-indicator-percentage="90">
                      <span></span>
                    </div>
                    <span>On Time</span>
                  </div>

                  {/* <!-- Indicator --> */}
                  <div class="indicator">
                    <strong>80%</strong>
                    <div class="indicator-bar" data-indicator-percentage="80">
                      <span></span>
                    </div>
                    <span>On Budget</span>
                  </div>
                </div>
              </div>

              {/* <!-- Widget --> */}
              <div class="sidebar-widget">
                <h3>Social Profiles</h3>
                <div class="freelancer-socials margin-top-25">
                  <ul>
                    <li>
                      <a href="#" title="Dribbble" data-tippy-placement="top">
                        <i class="icon-brand-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Twitter" data-tippy-placement="top">
                        <i class="icon-brand-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Behance" data-tippy-placement="top">
                        <i class="icon-brand-behance"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" title="GitHub" data-tippy-placement="top">
                        <i class="icon-brand-github"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- Widget --> */}
              <div class="sidebar-widget">
                <h3>Skills</h3>
                <div class="task-tags">
                  <span>iOS</span>
                  <span>Android</span>
                  <span>mobile apps</span>
                  <span>design</span>
                  <span>Python</span>
                  <span>Flask</span>
                  <span>PHP</span>
                  <span>WordPress</span>
                </div>
              </div>

              {/* <!-- Widget --> */}
              <div class="sidebar-widget">
                <h3>Attachments</h3>
                <div class="attachments-container">
                  <a href="#" class="attachment-box ripple-effect">
                    <span>Cover Letter</span>
                    <i>PDF</i>
                  </a>
                  <a href="#" class="attachment-box ripple-effect">
                    <span>Contract</span>
                    <i>DOCX</i>
                  </a>
                </div>
              </div>

              {/* <!-- Sidebar Widget --> */}
              <div class="sidebar-widget">
                <h3>Bookmark or Share</h3>

                {/* <!-- Bookmark Button --> */}
                <button class="bookmark-button margin-bottom-25">
                  <span class="bookmark-icon"></span>
                  <span class="bookmark-text">Bookmark</span>
                  <span class="bookmarked-text">Bookmarked</span>
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
      {showOfferPopup && <MakeOffer show = {showOfferPopup} handleClose={()=> setShowOfferPopup(false)} handleSubmit={()=> setShowOfferPopup(false) }/>}
    </>
  );
}
export default FreeLancerDetails;
