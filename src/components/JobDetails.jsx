import singleJob from "../utils/images/single-job.jpg";
import companyLogo3a from "../utils/images/company-logo-03a.png";
import gb from "../utils/images/flags/gb.svg";
import companyLogo2 from "../utils/images/company-logo-02.png";
import companyLogo3 from "../utils/images/company-logo-03.png";
import companyLogo05 from "../utils/images/company-logo-05.png";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { timeDifferenceFromNow } from "../utils/utils";
import ApplyJobPopup from "./modals/ApplyJobPopup";
import {
  addJobApplication,
  getJobsApplicationsByUser,
} from "../services/job-applications";
import toast from "react-hot-toast";
import { updateUserAPI } from "../services/user";
import { getCountryFlag } from "../utils/common";
function JobDetails() {
  const { id } = useParams();  
  const {
    jobsList,
    setUserJobApplications,
    userJobApplications,
    user,
    setUser,
  } = useContext(UserContext);

  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [JobDetails, setJobDetails] = useState(null);
  const [showApplyJobPopup, setShowApplyJobPopup] = useState(false);
  const [applied, setApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false); 
 

  useEffect(() => {
    if (user?.data?.bookmarkedJobs) {
      setBookmarkedJobs([...user?.data?.bookmarkedJobs]);
    }
  }, [user?.data]);

  useEffect(() => {
    console.log(userJobApplications, id);
    if (
      userJobApplications?.length &&
      userJobApplications.filter((application) => application.jobId === id)
        ?.length
    ) {
      setApplied(true);
    }
  }, [id, userJobApplications?.length]);

  useEffect(() => {
    if (id && jobsList?.length > 0) {
      const filteredJob = jobsList.find((job) => job._id === id);
      if (filteredJob) {
        console.log(filteredJob);
        setJobDetails(filteredJob);
      }
    }
  }, [id, jobsList]);

  useEffect(() => {
    if (bookmarkedJobs.includes(id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [bookmarkedJobs, id]);
  const handleJobApplication = async (
    applicantCV,
    applicantName,
    applicantEmail
  ) => {
    const formData = new FormData();
    formData.append("applicantCV", applicantCV);
    formData.append("applicantName", applicantName);
    formData.append("applicantEmail", applicantEmail);
    formData.append("jobId", id);
    try {
      const response = await addJobApplication(formData);
      if (response?.success) {
        toast.success("Job application has been sent");
        getJobApplicationsByUser();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to apply for job");
    }
  };
  const getJobApplicationsByUser = async () => {
    try {
      const response = await getJobsApplicationsByUser();
      if (response?.success && response?.jobApplications) {
        setUserJobApplications(response?.jobApplications);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get user job applications");
    }
  };

  const handleUpdateBookmarkedJobs = async (jobId) => {
    const bookmarksCopy = bookmarkedJobs?.length > 0 ? [...bookmarkedJobs] : [];
    const index = bookmarksCopy.indexOf(jobId);

    if (index !== -1) {
      // If jobId exists, remove it from the array
      bookmarksCopy.splice(index, 1);
    } else {
      // If jobId does not exist, add it to the array
      bookmarksCopy.push(jobId);
    }
    // send API call
    try {
      const data = user?.data || {};
      data.bookmarkedJobs = bookmarksCopy?.length > 0 ? [...bookmarksCopy] : [];
      const updateResult = await updateUserAPI({ data });
      if (updateResult?.success && updateResult?.user) {
        setUser(updateResult?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ JobDetails });
  const ratingNumber = JobDetails?.review?.rating;
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < ratingNumber) {
      return "filled";
    } else {
      return "empty";
    }
  });
console.log({JobDetails});
console.log({jobsList});
console.log('dsfsd',JobDetails?.categories);
const similarJobs = jobsList.filter((job) => {
  return job.category === JobDetails?.category && job._id !== JobDetails?._id;
});
  return (
    <>
      <div class="single-page-header" data-background-image={singleJob}>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="single-page-header-inner">
                <div class="left-side">
                  <div class="header-image">
                    <div className="job-listing-company-logo">
                      <img
                        src={singleJob.companyLogo || companyLogo05}
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="header-details">
                    <h3>{JobDetails?.title}</h3>
                    <h5>About the Employer</h5>
                    <ul>
                      <li>
                        <div class="star-rate" data-rating={ratingNumber ?? 0}>
                          {stars.map((starType, index) => (
                            <span
                              key={index}
                              className={`star ${starType}`}
                            ></span>
                          ))}
                        </div>
                      </li>
                      <li>
                        <img
                          class="flag"
                          src={getCountryFlag(JobDetails?.location)}
                        />
                      </li>
                      <li>
                        <div class="verified-badge-with-title">Verified</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="right-side">
                  <div class="salary-box">
                    <div class="salary-type">Annual Salary</div>
                    <div class="salary-amount">{JobDetails?.salary}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          {/* <!-- Content --> */}
          <div class="col-xl-8 col-lg-8 content-right-offset">
            <div class="single-page-section">
              <h3 class="margin-bottom-25">Job Description</h3>
              <p>{JobDetails?.description}</p>
              {/* <p>
                {
                  "A Restaurant General Manager oversees daily operations to ensure efficient service and profitability. They are responsible for staff management, customer satisfaction, inventory control, and financial reporting. The role requires strong leadership, problem-solving skills, and the ability to thrive in a fast-paced environment. Success involves balancing customer experience with operational efficiency and financial targets."
                }
              </p> */}
              {/* <p>
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative approaches to corporate strategy
                foster collaborative thinking to further the overall value
                proposition. Organically grow the holistic world view of
                disruptive innovation via workplace diversity and empowerment.
              </p>

              <p>
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
                content in real-time will have multiple touchpoints for
                offshoring.
              </p>

              <p>
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps. Nanotechnology immersion
                along the information highway will close the loop on focusing
                solely on the bottom line.
              </p> */}
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
                {JobDetails?.requiredSkills?.split(",")?.length > 0 &&
                  JobDetails?.requiredSkills?.split(",")?.map((skill) => {
                    return <span style={{ marginRight: 4 }}>{skill}</span>;
                  })}
              </div>
            </div>
            <div class="clearfix"></div>

            {/* <div class="single-page-section">
              <h3 class="margin-bottom-30">Location</h3>
              <div id="single-job-map-container">
                <div
                  id="singleListingMap"
                  data-latitude="51.507717"
                  data-longitude="-0.131095"
                  data-map-icon="im im-icon-Hamburger"
                ></div>
                <a href="#" id="streetView">
                  Street View
                </a>
              </div>
            </div> */}

            <div class="single-page-section">
              <h3 class="margin-bottom-25">Similar Jobs</h3>

              {/* <!-- Listings Container --> */}
              <div class="listings-container grid-layout">
                {/* <!-- Job Listing --> */}
                {similarJobs?.length > 0 ? 
                <div class="listings-container grid-layout">
                  
                {similarJobs.map((job) => (
                  <a key={job._id} href={`/job-details/${job._id}`} class="job-listing">
                    <div class="job-listing-details">
                      <div class="job-listing-company-logo">
                        <img src={companyLogo2} alt="" />
                      </div>
                      <div class="job-listing-description">
                        <h4 class="job-listing-company">{job.companyName}</h4>
                        <h3 class="job-listing-title">{job.title}</h3>
                      </div>
                    </div>
                    <div class="job-listing-footer">
                      <ul>
                        <li>
                          <i class="icon-material-outline-location-on"></i> {job.location}
                        </li>
                        <li>
                          <i class="icon-material-outline-business-center"></i> {job.type}
                        </li>
                        <li>
                          <i class="icon-material-outline-account-balance-wallet"></i> {job.salary}
                        </li>
                        <li>
                          <i class="icon-material-outline-access-time"></i> {timeDifferenceFromNow(job.createdAt)}
                        </li>
                      </ul>
                    </div>
                  </a>
                ))}
              </div>
              : 
              <div class="no-job-listing">
              <p>{'No similar jobs found'}</p> 
              </div>
              }

              </div>
              {/* <!-- Listings Container / End --> */}
            </div>
          </div>

          {/* <!-- Sidebar --> */}
          <div class="col-xl-4 col-lg-4">
            <div class="sidebar-container">
              <a
                class="apply-now-button popup-with-zoom-anim white-text-button"
                onClick={() => setShowApplyJobPopup(true)}
                style={
                  applied ? { pointerEvents: "none", cursor: "default" } : {}
                }
              >
                {applied ? "Applied" : "Apply Now"}{" "}
                {!applied && (
                  <i class="icon-material-outline-arrow-right-alt"></i>
                )}
              </a>

              {/* <!-- Sidebar Widget --> */}
              <div class="sidebar-widget">
                <div class="job-overview">
                  <div class="job-overview-headline">Job Summary</div>
                  <div class="job-overview-inner">
                    <ul>
                      <li>
                        <i class="icon-material-outline-location-on"></i>
                        <span>Location</span>
                        <h5>{JobDetails?.location}</h5>
                      </li>
                      <li>
                        <i class="icon-material-outline-business-center"></i>
                        <span>Job Type</span>
                        <h5>{JobDetails?.type}</h5>
                      </li>
                      <li>
                        <i class="icon-material-outline-local-atm"></i>
                        <span>Salary</span>
                        <h5>{JobDetails?.salary}</h5>
                      </li>
                      <li>
                        <i class="icon-material-outline-access-time"></i>
                        <span>Date Posted</span>
                        <h5>{`${timeDifferenceFromNow(
                          JobDetails?.createdAt
                        )}`}</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Sidebar Widget --> */}
              <div class="sidebar-widget">
                <h3>Bookmark</h3>

                {/* <!-- Bookmark Button --> */}
                <button
                  class={`${
                    isBookmarked ? "bookmarked-button" : "bookmark-button"
                  } margin-bottom-25`}
                  onClick={() => {
                    handleUpdateBookmarkedJobs(JobDetails?._id);
                  }}
                >
                  <span class="bookmark-icon"></span>
                  {!bookmarkedJobs?.includes(JobDetails?._id) && (
                    <span class="bookmark-text">Bookmark</span>
                  )}
                  {bookmarkedJobs?.includes(JobDetails?._id) && (
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
                </div>  */}

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
              </div>
            </div>
          </div>
        </div>
      </div>
      {showApplyJobPopup && (
        <ApplyJobPopup
          show={showApplyJobPopup}
          handleClose={() => setShowApplyJobPopup(false)}
          handleSubmit={handleJobApplication}
        />
      )}
    </>
  );
}
export default JobDetails;
