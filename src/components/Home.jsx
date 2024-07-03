
import gb from "../utils/images/flags/gb.svg";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import companyLogo05 from "../utils/images/company-logo-05.png";
import { UserContext } from "../context/userContext";
import { timeDifferenceFromNow, unixToDate } from "../utils/utils";
import { Dropdown } from "react-bootstrap";

function Home() {
  const { jobsList, user, isLoggedIn, freelancers } = useContext(UserContext);
  const categories = [
    "Admin Support",
    "Customer Service",
    "Data Analytics",
    "Design & Creative",
    "Legal",
    "Software Developing",
    "IT & Networking",
    "Writing",
    "Translation",
    "Sales & Marketing",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const navigate = useNavigate();
  const onRightClick = () => {
    const mainContainerId = document.getElementById("freelancer-container");
    if (mainContainerId) {
      mainContainerId.scrollLeft += 400;
    }
  };
  const onLeftClick = () => {
    const mainContainerId = document.getElementById("freelancer-container");
    if (mainContainerId) {
      mainContainerId.scrollLeft -= 400;
    }
  };
  const [locationInput, setLocationInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [searchJob, setSearchJob] = useState({ location: "", title: "" });
  const handleSelect = (category) => {
    setSelectedCategory(category);
  };
  const handleButtonClick = () => {
    setSearchJob((prevState) => ({
      ...prevState,
      location: locationInput,
      title: titleInput,
    }));
    window.scrollBy(0, 600);
  };
  // Function to filter jobs based on location and title
  const filteredJobs = jobsList.filter((job) => {
    // Convert inputs to lowercase for case-insensitive comparison
    const locationMatch = job.location
      .toLowerCase()
      .includes(searchJob?.location.toLowerCase());
    const titleMatch = job.title
      .toLowerCase()
      .includes(searchJob?.title.toLowerCase());
    return locationMatch && titleMatch;
  });

  console.log("ia loggd in...", isLoggedIn);

  return (
    <div>
      {/* <!-- Intro Banner
================================================== --> */}
      {/* <!-- add class "disable-gradient" to enable consistent background overlay --> */}
      <div
        class="intro-banner"
        data-background-image="images/section-background.jpg"
      >
        <div class="container">
          {/* <div className="background-image-container"></div> */}
          {/* <!-- Intro Headline --> */}
          <div class="row">
            <div class="col-md-12">
              <div class="banner-headline">
                <h3>
                  <strong>
                    Hire experts or be hired for any job, any time.
                  </strong>
                  <br />
                  <span>
                    Thousands of small businesses use{" "}
                    <strong class="color">Bid Bridge</strong> to turn their
                    ideas into reality.
                  </span>
                </h3>
                <br />
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <div class="banner-headline-alt">
                      <h3>Don't Just Dream, Do</h3>
                      <span>Find the best jobs in the digital industry</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Search Bar --> */}
          <div class="row">
            <div class="col-md-12">
              <div class="intro-banner-search-form margin-top-95">
                {/* <!-- Search Field --> */}
                <div class="intro-search-field with-autocomplete">
                  <label
                    for="autocomplete-input"
                    class="field-title ripple-effect"
                  >
                    Where?
                  </label>
                  <div class="input-with-icon">
                    <input
                      placeholder="Online Job"
                      id="autocomplete-input"
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                    />
                    <i class="icon-material-outline-location-on"></i>
                  </div>
                </div>

                {/* <!-- Search Field --> */}
                <div class="intro-search-field">
                  <label for="intro-keywords" class="field-title ripple-effect">
                    What job you want?
                  </label>
                  <input
                    id="intro-keywords"
                    placeholder="Job Title or Keywords"
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                </div>

                {/* <!-- Button --> */}
                <div class="intro-search-button">
                  <button
                    onClick={() => handleButtonClick()}
                    class="button ripple-effect"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Search Bar --> */}
          <div class="row">
            <div class="col-md-12">
              <div class="intro-banner-search-form margin-top-95">
                <div class="intro-search-field with-autocomplete">
                  <label
                    for="autocomplete-input"
                    class="field-title ripple-effect"
                  >
                    Where?
                  </label>
                  <div class="input-with-icon">
                    <input
                      id="autocomplete-input"
                      type="text"
                      placeholder="Online Job"
                    />
                    <i class="icon-material-outline-location-on"></i>
                  </div>
                </div>
                {/* <!-- Search Field --> */}
                <div class="intro-search-field">
                  <label for="intro-keywords" class="field-title ripple-effect">
                    What you need done?
                  </label>
                  <input
                    id="intro-keywords"
                    type="text"
                    placeholder="e.g. build me a website"
                  />
                </div>

                {/* <!-- Search Field --> */}
                <div class="intro-search-field" style={{justifyContent: 'center'}}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="primary"
                      id="dropdown-basic"
                      className="w-101"
                    >
                      {selectedCategory}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="right-offset-menu">
                      {categories.map((category, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => handleSelect(category)}
                        >
                          {category}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                
                </div>
                {/* <!-- Button --> */}
                <div class="intro-search-button">
                  <button class="button ripple-effect">Search</button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Search Field End --> */}

          {/* <!-- Stats --> */}
          <div class="row">
            <div class="col-md-12">
              <ul class="intro-stats margin-top-45 hide-under-992px">
                <li>
                  <strong class="counter">1,586</strong>
                  <span>Jobs Posted</span>
                </li>
                <li>
                  <strong class="counter">3,543</strong>
                  <span>Tasks Posted</span>
                </li>
                <li>
                  <strong class="counter">1,232</strong>
                  <span>Freelancers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Icon Boxes --> */}
      <div class="section padding-top-65 padding-bottom-65">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              {/* <!-- Section Headline --> */}
              <div class="section-headline centered margin-top-0 margin-bottom-5">
                <h3>How It Works?</h3>
              </div>
            </div>

            <div class="col-xl-4 col-md-4">
              {/* <!-- Icon Box --> */}
              <div class="icon-box with-line">
                {/* <!-- Icon --> */}
                <div class="icon-box-circle">
                  <div class="icon-box-circle-inner">
                    <i class="icon-line-awesome-lock"></i>
                    <div class="icon-box-check">
                      <i class="icon-material-outline-check"></i>
                    </div>
                  </div>
                </div>
                <h3>Create an Account</h3>
                <p>
                  Bring to the table win-win survival strategies to ensure
                  proactive domination going forward.
                </p>
              </div>
            </div>

            <div class="col-xl-4 col-md-4">
              {/* <!-- Icon Box --> */}
              <div class="icon-box with-line">
                {/* <!-- Icon --> */}
                <div class="icon-box-circle">
                  <div class="icon-box-circle-inner">
                    <i class="icon-line-awesome-legal"></i>
                    <div class="icon-box-check">
                      <i class="icon-material-outline-check"></i>
                    </div>
                  </div>
                </div>
                <h3>Post a Task</h3>
                <p>
                  Efficiently unleash cross-media information without. Quickly
                  maximize return on investment.
                </p>
              </div>
            </div>

            <div class="col-xl-4 col-md-4">
              {/* <!-- Icon Box --> */}
              <div class="icon-box">
                {/* <!-- Icon --> */}
                <div class="icon-box-circle">
                  <div class="icon-box-circle-inner">
                    <i class=" icon-line-awesome-trophy"></i>
                    <div class="icon-box-check">
                      <i class="icon-material-outline-check"></i>
                    </div>
                  </div>
                </div>
                <h3>Choose an Expert</h3>
                <p>
                  Nanotechnology immersion along the information highway will
                  close the loop on focusing solely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Icon Boxes / End --> */}
      {/* <!-- Category Boxes -->*/}
      <div class="section margin-top-65">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="section-headline centered margin-bottom-15">
                <h3>Popular Job Categories</h3>
              </div>

              {/*<!-- Category Boxes Container -->*/}
              <div class="categories-container">
                {/*<!-- Category Box -->*/}
                <a href="jobs-grid-layout-full-page.html" class="category-box">
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-file-code-o"></i>
                  </div>
                  <div class="category-box-counter">612</div>
                  <div class="category-box-content">
                    <h3>Web & Software Dev</h3>
                    <p>Software Engineer, Web / Mobile Developer & More</p>
                  </div>
                </a>

                {/*<!-- Category Box -->*/}
                <a
                  href="jobs-list-layout-full-page-map.html"
                  class="category-box"
                >
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-cloud-upload"></i>
                  </div>
                  <div class="category-box-counter">113</div>
                  <div class="category-box-content">
                    <h3>Data Science & Analitycs</h3>
                    <p>Data Specialist / Scientist, Data Analyst & More</p>
                  </div>
                </a>

                {/*<!-- Category Box -->*/}
                <a
                  href="jobs-list-layout-full-page-map.html"
                  class="category-box"
                >
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-suitcase"></i>
                  </div>
                  <div class="category-box-counter">186</div>
                  <div class="category-box-content">
                    <h3>Accounting & Consulting</h3>
                    <p>Auditor, Accountant, Fnancial Analyst & More</p>
                  </div>
                </a>

                {/*<!-- Category Box -->*/}
                <a href="jobs-list-layout-1.html" class="category-box">
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-pencil"></i>
                  </div>
                  <div class="category-box-counter">298</div>
                  <div class="category-box-content">
                    <h3>Writing & Translations</h3>
                    <p>Copywriter, Creative Writer, Translator & More</p>
                  </div>
                </a>

                {/*	<!-- Category Box -->*/}
                <a href="jobs-list-layout-2.html" class="category-box">
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-pie-chart"></i>
                  </div>
                  <div class="category-box-counter">549</div>
                  <div class="category-box-content">
                    <h3>Sales & Marketing</h3>
                    <p>Brand Manager, Marketing Coordinator & More</p>
                  </div>
                </a>

                {/*<!-- Category Box -->*/}
                <a href="jobs-list-layout-1.html" class="category-box">
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-image"></i>
                  </div>
                  <div class="category-box-counter">873</div>
                  <div class="category-box-content">
                    <h3>Graphics & Design</h3>
                    <p>Creative Director, Web Designer & More</p>
                  </div>
                </a>

                {/*<!-- Category Box -->*/}
                <a href="jobs-list-layout-2.html" class="category-box">
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-bullhorn"></i>
                  </div>
                  <div class="category-box-counter">125</div>
                  <div class="category-box-content">
                    <h3>Digital Marketing</h3>
                    <p>Darketing Analyst, Social Profile Admin & More</p>
                  </div>
                </a>
                {/*<!-- Category Box -->*/}

                <a href="jobs-grid-layout-full-page.html" class="category-box">
                  <div class="category-box-icon">
                    <i class="icon-line-awesome-graduation-cap"></i>
                  </div>
                  <div class="category-box-counter">445</div>
                  <div class="category-box-content">
                    <h3>Education & Training</h3>
                    <p>Advisor, Coach, Education Coordinator & More</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- Category Boxes / End -->*/}

      {/* <!-- Features Jobs --> */}
      {(isLoggedIn == false || user?.role === "freelancer") && (
        <div class="section gray margin-top-45 padding-top-65 padding-bottom-75">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                {/* <!-- Section Headline --> */}
                <div class="section-headline margin-top-0 margin-bottom-35">
                  <h3>Featured Jobs</h3>
                  <a onClick={() => navigate("/jobs")} class="headline-link">
                    Browse All Jobs
                  </a>
                </div>
                <div class="listings-container compact-list-layout margin-top-35">
                  {filteredJobs?.length > 0 &&
                    filteredJobs.map((job) => {
                      return (
                        <a
                          onClick={() => navigate(`/job/details/${job._id}`)}
                          class="job-listing"
                        >
                          {/* <!-- Job Listing Details --> */}
                          <div class="job-listing-details">
                            {/* <!-- Logo --> */}
                            <div class="job-listing-company-logo">
                              <img
                                src={job.companyLogo || companyLogo05}
                                alt=""
                              />
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
                            <a
                              onClick={() =>
                                navigate(`job/details/:${job._id}`)
                              }
                              class="job-listing with-apply-button"
                            >
                              <span class="list-apply-button ripple-effect">
                                Apply Now
                              </span>
                            </a>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Featured Jobs / End --> */}
      <div
        class="photo-section"
        data-background-image="images/section-background.jpg"
      >
        {/* <!-- Infobox -->*/}
        <div class="text-content white-font">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-8 col-sm-12">
                <h2>
                  Hire experts or be hired. <br /> For any job, any time.
                </h2>
                <p>
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation is on the runway
                  towards.
                </p>
                <a
                  onClick={() => navigate("/pricing")}
                  class="button button-sliding-icon ripple-effect big margin-top-20"
                >
                  Get Started{" "}
                  <i class="icon-material-outline-arrow-right-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Infobox  End-->*/}
      </div>
      {/* <!-- Highest Rated Freelancers --> */}
      {(isLoggedIn == false || user?.role === "employer") && (
        <div class="section gray padding-top-65 padding-bottom-70 full-width-carousel-fix">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                {/* <!-- Section Headline --> */}
                <div class="section-headline margin-top-0 margin-bottom-25">
                  <h3>Highest Rated Freelancers</h3>
                  <a
                    onClick={() => navigate("/freelancers")}
                    class="headline-link"
                  >
                    Browse All Freelancers
                  </a>
                </div>
              </div>

              <div
                class="col-xl-12"
                style={{ display: "flex", flexDirection: "row" }}
              >
                {/* <div className="left-icon" style={{width: '40px', display: 'flex', alignItems: 'center'}} > */}
                {/* <div className="icon-container" style={{backgroundColor: '#770737', width: '40px', height: ' 40px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={leftArrow} alt="" width={'25px'} height={'25px'} color={'white'}/>
                    </div> */}
                <button
                  class="slick-prev slick-arrow"
                  aria-label="Previous"
                  type="button"
                  aria-disabled="false"
                  onClick={() => onLeftClick()}
                >
                  Previous
                </button>

                {/* </div> */}
                <div
                  class="default-slick-carousel freelancers-container freelancers-grid-layout"
                  id="freelancer-container"
                >
                  {/* <!--Freelancer --> */}
                  {freelancers?.length > 0 &&
                    freelancers.map((freelancer) => {
                      return (
                        <div class="freelancer">
                          {/* <!-- Overview --> */}
                          <div class="freelancer-overview">
                            <div class="freelancer-overview-inner">
                              {/* <!-- Bookmark Icon --> */}
                              <span class="bookmark-icon"></span>

                              {/* <!-- Avatar --> */}
                              <div class="freelancer-avatar">
                                <div class="verified-badge"></div>
                                <a href="single-freelancer-profile.html">
                                  <img src={freelancer.avatar} alt="" />
                                </a>
                              </div>

                              {/* <!-- Name --> */}
                              <div class="freelancer-name">
                                <h4>
                                  <a href="single-freelancer-profile.html">
                                    {freelancer?.name}{" "}
                                    <img
                                      class="flag"
                                      src={gb}
                                      alt=""
                                      title="United Kingdom"
                                      data-tippy-placement="top"
                                    />
                                  </a>
                                </h4>
                                <span>{freelancer?.title}</span>
                              </div>

                              {/* <!-- Rating --> */}
                              <div class="freelancer-rating">
                                <div
                                  class="star-rating"
                                  data-rating="5.0"
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Details --> */}
                          <div class="freelancer-details">
                            <div class="freelancer-details-list">
                              <ul>
                                <li>
                                  Location{" "}
                                  <strong>
                                    <i class="icon-material-outline-location-on"></i>{" "}
                                    {freelancer?.location}
                                  </strong>
                                </li>
                                <li>
                                  Rate <strong>{freelancer?.rate}</strong>
                                </li>
                                <li>
                                  Job Success{" "}
                                  <strong>{freelancer?.jobSuccessRate}</strong>
                                </li>
                              </ul>
                            </div>
                            <a
                              onClick={() => {
                                navigate("/freelancer/details/:id");
                              }}
                              class="button button-sliding-icon ripple-effect"
                            >
                              View Profile{" "}
                              <i class="icon-material-outline-arrow-right-alt"></i>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* <div className="right-icon" style={{width: '35px',display: 'flex', alignItems: 'center'}}> */}
                {/* <div className="icon-container">
                <img src={rightArrow} alt="" width={'25px'} height={'25px'} />
                </div> */}
                <button
                  class="slick-next slick-arrow"
                  aria-label="Next"
                  type="button"
                  aria-disabled="false"
                  onClick={() => onRightClick()}
                >
                  Next
                </button>

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Highest Rated Freelancers / End--> */}

      <div class="section padding-top-70 padding-bottom-75">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="counters-container">
                {/* <!-- Counter --> */}
                <div class="single-counter">
                  <i class="icon-line-awesome-suitcase"></i>
                  <div class="counter-inner">
                    <h3>
                      <span class="counter">1,586</span>
                    </h3>
                    <span class="counter-title">Jobs Posted</span>
                  </div>
                </div>

                {/* <!-- Counter --> */}
                <div class="single-counter">
                  <i class="icon-line-awesome-legal"></i>
                  <div class="counter-inner">
                    <h3>
                      <span class="counter">3,543</span>
                    </h3>
                    <span class="counter-title">Tasks Posted</span>
                  </div>
                </div>

                {/* <!-- Counter --> */}
                <div class="single-counter">
                  <i class="icon-line-awesome-user"></i>
                  <div class="counter-inner">
                    <h3>
                      <span class="counter">2,413</span>
                    </h3>
                    <span class="counter-title">Active Members</span>
                  </div>
                </div>

                {/* <!-- Counter --> */}
                <div class="single-counter">
                  <i class="icon-line-awesome-trophy"></i>
                  <div class="counter-inner">
                    <h3>
                      <span class="counter">99</span>%
                    </h3>
                    <span class="counter-title">Satisfaction Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
