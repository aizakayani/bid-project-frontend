import { useContext } from "react";
import { UserContext } from "../context/userContext";
import companyLogo05 from "../utils/images/company-logo-05.png";
import { unixToDate } from "../utils/utils";
function DashboardManageJobs() {
  const { userJobs } = useContext(UserContext);
  const checkExpiration = (date) => {
    const date = new Date(date)
    const newDate = new Date(date.setMonth(date.getMonth() + 1))

    const newDateTime = newDate.getTime()
    if (isDateGreaterThanCurrent(newDate)) {
      return "Expired";
    } else {
      return `Expiring on ${unixToDate(job?.createdAt)}`
    }
  }
  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>Manage Jobs</h3>

          {/* <!-- Breadcrumbs --> */}
          <nav id="breadcrumbs" class="dark">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>Manage Jobs</li>
            </ul>
          </nav>
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
                                      {`Posted on ${unixToDate(job?.createdAt)}`}
                                    </li>
                                    <li>
                                      <i class="icon-material-outline-date-range"></i>{" "}
                                      Expiring on 10 August, 2019
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
    </div>
  );
}
export default DashboardManageJobs;
