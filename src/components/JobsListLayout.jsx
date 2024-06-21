import { useNavigate } from "react-router-dom";
import companyLogo05 from "../utils/images/company-logo-05.png";
import { UserContext } from "../context/userContext";
import { useContext, useState } from "react";
import { timeDifferenceFromNow, unixToDate } from "../utils/utils";
function JobsListLayout() {
  const navigate = useNavigate();
  // const { jobsList } = useContext(UserContext);
  // const jobsList = [
  //   {
  //     title: "Bilingual Event Support Specialist",
  //     company: "Hexagon",
  //     location: "SanFrancissco",
  //     type: "Full Time",
  //     postDate: "2 days ago",
  //     logo: companyLogo1,
  //   },
  // ];
  const { jobsList } = useContext(UserContext);
 const[isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div class="container margin-top-90">
      <div class="row">
        <div class="col-xl-3 col-lg-4">
          <div class="sidebar-container">
            {/* <!-- Location --> */}
            <div class="sidebar-widget">
              <h3>Location</h3>
              <div class="input-with-icon">
                <div id="autocomplete-container">
                  <input
                    id="autocomplete-input"
                    type="text"
                    placeholder="Location"
                  />
                </div>
                <i class="icon-material-outline-location-on"></i>
              </div>
            </div>

            {/* <!-- Keywords --> */}
            <div class="sidebar-widget">
              <h3>Keywords</h3>
              <div class="keywords-container">
                <div class="keyword-input-container">
                  <input
                    type="text"
                    class="keyword-input"
                    placeholder="e.g. job title"
                  />
                  <button class="keyword-input-button ripple-effect">
                    <i class="icon-material-outline-add"></i>
                  </button>
                </div>
                <div class="keywords-list">
                  {/* <!-- keywords go here --> */}
                </div>
                <div class="clearfix"></div>
              </div>
            </div>

            {/* <!-- Category --> */}
            <div class="sidebar-widget">
              <h3 onClick={()=> setIsMenuOpen(!isMenuOpen)}>Category</h3>
              {isMenuOpen &&   <select
                class="selectpicker"
                multiple
                data-selected-text-format="count"
                data-size="7"
                title="All Categories"
              >
                <option>Accounting and Finance</option>
                <option>Clerical & Data Entry</option>
                <option>Counseling</option>
                <option>Court Administration</option>
                <option>Human Resources</option>
                <option>Investigative</option>
                <option>IT and Computers</option>
                <option>Law Enforcement</option>
                <option>Management</option>
                <option>Miscellaneous</option>
                <option>Public Relations</option>
              </select>}
            
            </div>

            {/* <!-- Job Types --> */}
            <div class="sidebar-widget">
              <h3>Job Type</h3>

              <div class="switches-list">
                <div class="switch-container">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="switch-button"></span> Freelance
                  </label>
                </div>

                <div class="switch-container">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="switch-button"></span> Full Time
                  </label>
                </div>

                <div class="switch-container">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="switch-button"></span> Part Time
                  </label>
                </div>

                <div class="switch-container">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="switch-button"></span> Internship
                  </label>
                </div>
                <div class="switch-container">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="switch-button"></span> Temporary
                  </label>
                </div>
              </div>
            </div>

            {/* <!-- Tags --> */}
            <div class="sidebar-widget">
              <h3>Tags</h3>

              <div class="tags-container">
                <div class="tag">
                  <input type="checkbox" id="tag1" />
                  <label for="tag1">front-end dev</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag2" />
                  <label for="tag2">angular</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag3" />
                  <label for="tag3">react</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag4" />
                  <label for="tag4">vue js</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag5" />
                  <label for="tag5">web apps</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag6" />
                  <label for="tag6">design</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag7" />
                  <label for="tag7">wordpress</label>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-8 content-left-offset">
          <h3 class="page-title">Search Results</h3>

          <div class="notify-box margin-top-15" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div class="switch-container">
              <label class="switch">
                <input type="checkbox" />
                <span class="switch-button"></span>
                <span class="switch-text">
                  Turn on email alerts for this search
                </span>
              </label>
            </div>

            <div style={{display: 'flex', gap: '5px', flexWrap: 'nowrap'}}>
              <div style={{display: 'flex', flexWrap: 'nowrap'}}>Sort by:</div>
             <select>
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
                <option value='random'>Random</option>
               
      </select>
             </div>
          </div>

          <div class="listings-container compact-list-layout margin-top-35">
            {jobsList?.length > 0 &&
              jobsList.map((job) => {
                return (
                  <a
                    onClick={() => navigate(`/job/details/${job._id}`)}
                    class="job-listing"
                  >
                    {/* <!-- Job Listing Details --> */}
                    <div class="job-listing-details">
                      {/* <!-- Logo --> */}
                      <div class="job-listing-company-logo">
                        <img src={job.companyLogo || companyLogo05} alt="" />
                      </div>

                      {/* <!-- Details --> */}
                      <div class="job-listing-description">
                        <h3 class="job-listing-title">{job.title}</h3>

                        {/* <!-- Job Listing Footer --> */}
                        <div class="job-listing-footer">
                          <ul>
                            <li>
                              <i class="icon-material-outline-business"></i>{" "}
                              {job.company}{" "}
                              <div
                                class="verified-badge"
                                title="Verified Employer"
                                data-tippy-placement="top"
                              ></div>
                            </li>
                            <li>
                              <i class="icon-material-outline-location-on"></i>{" "}
                              {job.location}
                            </li>
                            <li>
                              <i class="icon-material-outline-business-center"></i>{" "}
                              {job.type}
                            </li>
                            <li>
                              <i class="icon-material-outline-access-time"></i>{" "}
                              {`${timeDifferenceFromNow(job?.createdAt)}`}
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* <!-- Bookmark --> */}
                      <span class="bookmark-icon"></span>
                    </div>
                  </a>
                );
              })}
          </div>

          {/* <!-- Pagination --> */}
          <div class="clearfix"></div>
          <div class="row">
            <div class="col-md-12">
              {/* <!-- Pagination --> */} {
                jobsList?. length > 5 && <div class="pagination-container margin-top-60 margin-bottom-60">
                <nav class="pagination">
                  <ul>
                    <li class="pagination-arrow">
                      <a href="#">
                        <i class="icon-material-outline-keyboard-arrow-left"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#" class="current-page">
                        2
                      </a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">4</a>
                    </li>
                    <li class="pagination-arrow">
                      <a href="#">
                        <i class="icon-material-outline-keyboard-arrow-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              }
              
            </div>
          </div>
          {/* <!-- Pagination / End --> */}
        </div>
      </div>
    </div>
  );
}

export default JobsListLayout;
