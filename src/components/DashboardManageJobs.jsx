import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import companyLogo05 from "../utils/images/company-logo-05.png";
import { addOneMonthToUnixDate, unixToDate } from "../utils/utils";
import Popup from "./modals/Popup";
import { deleteJobAPI, getJobsByUser } from "../services/job";
import toast from "react-hot-toast";
function DashboardManageJobs({ handleUpdateJob }) {
  const { userJobs, setUserJobs } = useContext(UserContext);
  const [showDeleteJobPopup, setShowDeleteJobPopup] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  const checkExpiration = (createdTime) => {
    const currentTime = Date.now() / 1000;
    if (currentTime < createdTime) {
      return "Expired";
    } else {
      const expiringDate = addOneMonthToUnixDate(createdTime);
      return `Expiring on ${unixToDate(expiringDate)}`;
    }
  };

  const handleDeleteJob = async () => {
    try {
      const deleteJobResponse = await deleteJobAPI(jobIdToDelete);
      if (deleteJobResponse.success) {
        toast.success("Job deleted successfully");
        await getJobs();
      } else {
        toast.error("Failed to delete job");
      }
      setShowDeleteJobPopup(false);
      setJobIdToDelete(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete job");
    }
  };

  const getJobs = async () => {
    // fetch jobs
    try {
      const jobsResult = await getJobsByUser();
      if (jobsResult?.success && jobsResult?.jobs?.length > 0) {
        setUserJobs([...jobsResult?.jobs]);
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
          <h3>Manage Jobs</h3>

          
        </div>

        {/* <!-- Row --> */}
        <div class="row">
          {/* <!-- Dashboard Box --> */}
          <div class="col-xl-12">
            <div class="dashboard-box margin-top-0">
              {/* <!-- Headline --> */}
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-business-center"></i> My Job
                  Listings
                </h3>
              </div>

              <div class="content">
                <ul class="dashboard-box-list">
                  {userJobs?.length > 0 &&
                    userJobs.map((job) => {
                      return (
                        <li>
                          {/* <!-- Job Listing --> */}
                          <div class="job-listing">
                            {/* <!-- Job Listing Details --> */}
                            <div class="job-listing-details">
                              {/* <!-- Logo --> */}
                              <a href="#" class="job-listing-company-logo">
                                <img
                                  src={job?.companyLogo || companyLogo05}
                                  alt=""
                                />
                              </a>

                              {/* <!-- Details --> */}
                              <div class="job-listing-description">
                                <h3 class="job-listing-title">
                                  <a href="#">{job.title}</a>{" "}
                                  <span class="dashboard-status-button green">
                                    Pending Approval
                                  </span>
                                </h3>

                                {/* <!-- Job Listing Footer --> */}
                                <div class="job-listing-footer">
                                  <ul>
                                    <li>
                                      <i class="icon-material-outline-date-range"></i>{" "}
                                      {`Posted on ${unixToDate(
                                        job?.createdAt
                                      )}`}
                                    </li>
                                    <li>
                                      <i class="icon-material-outline-date-range"></i>{" "}
                                      {`${checkExpiration(job?.createdAt)}`}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Buttons --> */}
                          <div class="buttons-to-right always-visible">
                            <a
                              href="dashboard-manage-candidates.html"
                              class="button ripple-effect"
                            >
                              <i class="icon-material-outline-supervisor-account"></i>{" "}
                              Manage Candidates{" "}
                              <span class="button-info">0</span>
                            </a>
                            <a
                              onClick={() => {
                                handleUpdateJob(job);
                              }}
                              class="button gray ripple-effect ico"
                              title="Edit"
                              data-tippy-placement="top"
                            >
                              <i class="icon-feather-edit"></i>
                            </a>
                            <a
                              onClick={() => {
                                setJobIdToDelete(job._id);
                                setShowDeleteJobPopup(true);
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

                  <li>
                    {/* <!-- Job Listing --> */}
                    <div class="job-listing">
                      {/* <!-- Job Listing Details --> */}
                      <div class="job-listing-details">
                        {/* <!-- Details --> */}
                        <div class="job-listing-description">
                          <h3 class="job-listing-title">
                            <a href="#">Full Stack PHP Developer</a>{" "}
                            <span class="dashboard-status-button yellow">
                              Expiring
                            </span>
                          </h3>

                          {/* <!-- Job Listing Footer --> */}
                          <div class="job-listing-footer">
                            <ul>
                              <li>
                                <i class="icon-material-outline-date-range"></i>{" "}
                                Posted on 28 June, 2019
                              </li>
                              <li>
                                <i class="icon-material-outline-date-range"></i>{" "}
                                Expiring on 28 July, 2019
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Buttons --> */}
                    <div class="buttons-to-right always-visible">
                      <a
                        href="dashboard-manage-candidates.html"
                        class="button ripple-effect"
                      >
                        <i class="icon-material-outline-supervisor-account"></i>{" "}
                        Manage Candidates <span class="button-info">3</span>
                      </a>
                      <a
                        href="#"
                        class="button gray ripple-effect ico"
                        title="Edit"
                        data-tippy-placement="top"
                      >
                        <i class="icon-feather-edit"></i>
                      </a>
                      <a
                        href="#"
                        class="button gray ripple-effect ico"
                        title="Remove"
                        data-tippy-placement="top"
                      >
                        <i class="icon-feather-trash-2"></i>
                      </a>
                    </div>
                  </li>

                  <li>
                    {/* <!-- Job Listing --> */}
                    <div class="job-listing">
                      {/* <!-- Job Listing Details --> */}
                      <div class="job-listing-details">
                        {/* <!-- Details --> */}
                        <div class="job-listing-description">
                          <h3 class="job-listing-title">
                            <a href="#">Node.js Developer</a>{" "}
                            <span class="dashboard-status-button red">
                              Expired
                            </span>
                          </h3>

                          {/* <!-- Job Listing Footer --> */}
                          <div class="job-listing-footer">
                            <ul>
                              <li>
                                <i class="icon-material-outline-date-range"></i>{" "}
                                Posted on 16 May, 2019
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Buttons --> */}
                    <div class="buttons-to-right always-visible">
                      <a
                        href="dashboard-manage-candidates.html"
                        class="button ripple-effect"
                      >
                        <i class="icon-material-outline-supervisor-account"></i>{" "}
                        Manage Candidates <span class="button-info">7</span>
                      </a>
                      <a href="#" class="button dark ripple-effect">
                        <i class="icon-feather-rotate-ccw"></i> Refresh
                      </a>
                      <a
                        href="#"
                        class="button gray ripple-effect ico"
                        title="Edit"
                        data-tippy-placement="top"
                      >
                        <i class="icon-feather-edit"></i>
                      </a>
                      <a
                        href="#"
                        class="button gray ripple-effect ico"
                        title="Remove"
                        data-tippy-placement="top"
                      >
                        <i class="icon-feather-trash-2"></i>
                      </a>
                    </div>
                  </li>
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
      <Popup
        show={showDeleteJobPopup}
        title={"Delete job"}
        description={"Are you sure you want to delete job?"}
        okButtonText={"Delete"}
        closeButtonText={"Cancel"}
        handleOk={handleDeleteJob}
        handleClose={() => setShowDeleteJobPopup(false)}
      />
    </div>
  );
}
export default DashboardManageJobs;
