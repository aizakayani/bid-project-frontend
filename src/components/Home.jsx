
import userAvatarBig1 from "../utils/images/user-avatar-big-01.jpg";
import gb from "../utils/images/flags/gb.svg";
import userAvatarBig2 from "../utils/images/user-avatar-big-02.jpg";
import de from "../utils/images/flags/de.svg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
import p1 from "../utils/images/flags/pl.svg";
import userAvatarBig3 from "../utils/images/user-avatar-big-03.jpg";
import au from "../utils/images/flags/au.svg";
import it from "../utils/images/flags/it.svg";
import fr from "../utils/images/flags/fr.svg";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import companyLogo05 from "../utils/images/company-logo-05.png";
import { UserContext } from "../context/userContext";
import { timeDifferenceFromNow, unixToDate } from "../utils/utils";

function Home() {
  
  const { jobsList } = useContext(UserContext);
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
  const [locationInput, setLocationInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [searchJob, setSearchJob] = useState({location: '', title: ''});
  const handleButtonClick = () => {
    setSearchJob((prevState) => ({
      ...prevState,
      location: locationInput,
      title: titleInput,
    }));
    window.scrollBy(0, 300);
  };
  // Function to filter jobs based on location and title
  const filteredJobs = jobsList.filter(job => {
    // Convert inputs to lowercase for case-insensitive comparison
    const locationMatch = job.location.toLowerCase().includes(searchJob?.location.toLowerCase());
    const titleMatch = job.title.toLowerCase().includes(searchJob?.title.toLowerCase());
    return locationMatch && titleMatch;
  });
  

  
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

      {/* <!-- Features Jobs --> */}
      <div class="section gray margin-top-45 padding-top-65 padding-bottom-75">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              {/* <!-- Section Headline --> */}
              <div class="section-headline margin-top-0 margin-bottom-35">
                <h3>Featured Jobs</h3>
                <a
                  onClick={() => navigate("/jobs")}
                  class="headline-link"
                >
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
                      <a
                    onClick={() => navigate(`job/details/:${job._id}`)}
                   class="job-listing with-apply-button"
                  >
                    <span class="list-apply-button ripple-effect">Apply Now</span>
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
      {/* <!-- Featured Jobs / End --> */}

      {/* <!-- Highest Rated Freelancers --> */}
      <div class="section gray padding-top-65 padding-bottom-70 full-width-carousel-fix">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              {/* <!-- Section Headline --> */}
              <div class="section-headline margin-top-0 margin-bottom-25">
                <h3>Highest Rated Freelancers</h3>
                <a 
                onClick={() => navigate("/freelancers")}
                class="headline-link">Browse All Freelancers</a>
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
                          <img src={userAvatarBig1} alt="" />
                        </a>
                      </div>

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
                        <span>UI/UX Designer</span>
                      </div>

                      {/* <!-- Rating --> */}
                      <div class="freelancer-rating">
                        <div class="star-rating" data-rating="5.0"></div>
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
                            London
                          </strong>
                        </li>
                        <li>
                          Rate <strong>$60 / hr</strong>
                        </li>
                        <li>
                          Job Success <strong>95%</strong>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="single-freelancer-profile.html"
                      class="button button-sliding-icon ripple-effect"
                    >
                      View Profile{" "}
                      <i class="icon-material-outline-arrow-right-alt"></i>
                    </a>
                  </div>
                </div>
                {/* <!-- Freelancer / End -->

					<!--Freelancer --> */}
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
                          <img src={userAvatarBig2} alt="" />
                        </a>
                      </div>

                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="#">
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
                        <span>iOS Expert + Node Dev</span>
                      </div>

                      {/* <!-- Rating --> */}
                      <div class="freelancer-rating">
                        <div class="star-rating" data-rating="5.0"></div>
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
                            Berlin
                          </strong>
                        </li>
                        <li>
                          Rate <strong>$40 / hr</strong>
                        </li>
                        <li>
                          Job Success <strong>88%</strong>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="single-freelancer-profile.html"
                      class="button button-sliding-icon ripple-effect"
                    >
                      View Profile{" "}
                      <i class="icon-material-outline-arrow-right-alt"></i>
                    </a>
                  </div>
                </div>
                {/* <!-- Freelancer / End -->

					<!--Freelancer --> */}
                <div class="freelancer">
                  {/* <!-- Overview --> */}
                  <div class="freelancer-overview">
                    <div class="freelancer-overview-inner">
                      {/* <!-- Bookmark Icon --> */}
                      <span class="bookmark-icon"></span>

                      {/* <!-- Avatar --> */}
                      <div class="freelancer-avatar">
                        <a href="single-freelancer-profile.html">
                          <img src={userAvatarPlaceholder} alt="" />
                        </a>
                      </div>

                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="#">
                            Marcin Kowalski{" "}
                            <img
                              class="flag"
                              src={p1}
                              alt=""
                              title="Poland"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        <span>Front-End Developer</span>
                      </div>

                      {/* <!-- Rating --> */}
                      <div class="freelancer-rating">
                        <div class="star-rating" data-rating="4.9"></div>
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
                            Warsaw
                          </strong>
                        </li>
                        <li>
                          Rate <strong>$50 / hr</strong>
                        </li>
                        <li>
                          Job Success <strong>100%</strong>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="single-freelancer-profile.html"
                      class="button button-sliding-icon ripple-effect"
                    >
                      View Profile{" "}
                      <i class="icon-material-outline-arrow-right-alt"></i>
                    </a>
                  </div>
                </div>
                {/* <!-- Freelancer / End --> */}

                {/* <!--Freelancer --> */}
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
                          <img src={userAvatarBig3} alt="" />
                        </a>
                      </div>

                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="#">
                            Sindy Forest{" "}
                            <img
                              class="flag"
                              src={au}
                              alt=""
                              title="Australia"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        <span>Magento Certified Developer</span>
                      </div>

                      {/* <!-- Rating --> */}
                      <div class="freelancer-rating">
                        <div class="star-rating" data-rating="5.0"></div>
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
                            Brisbane
                          </strong>
                        </li>
                        <li>
                          Rate <strong>$70 / hr</strong>
                        </li>
                        <li>
                          Job Success <strong>100%</strong>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="single-freelancer-profile.html"
                      class="button button-sliding-icon ripple-effect"
                    >
                      View Profile{" "}
                      <i class="icon-material-outline-arrow-right-alt"></i>
                    </a>
                  </div>
                </div>
                {/* <!-- Freelancer / End --> */}

                {/* <!--Freelancer --> */}
                <div class="freelancer">
                  {/* <!-- Overview --> */}
                  <div class="freelancer-overview">
                    <div class="freelancer-overview-inner">
                      {/* <!-- Bookmark Icon --> */}
                      <span class="bookmark-icon"></span>

                      {/* <!-- Avatar --> */}
                      <div class="freelancer-avatar">
                        <a href="single-freelancer-profile.html">
                          <img src={userAvatarPlaceholder} alt="" />
                        </a>
                      </div>

                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="#">
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
                        <span>Laravel Dev</span>
                      </div>

                      {/* <!-- Rating --> */}
                      <div class="freelancer-rating">
                        <div class="star-rating" data-rating="4.5"></div>
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
                            Milan
                          </strong>
                        </li>
                        <li>
                          Rate <strong>$80 / hr</strong>
                        </li>
                        <li>
                          Job Success <strong>89%</strong>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="single-freelancer-profile.html"
                      class="button button-sliding-icon ripple-effect"
                    >
                      View Profile{" "}
                      <i class="icon-material-outline-arrow-right-alt"></i>
                    </a>
                  </div>
                </div>
                {/* <!-- Freelancer / End --> */}

                {/* <!--Freelancer --> */}
                <div class="freelancer">
                  {/* <!-- Overview --> */}
                  <div class="freelancer-overview">
                    <div class="freelancer-overview-inner">
                      {/* <!-- Bookmark Icon --> */}
                      <span class="bookmark-icon"></span>

                      {/* <!-- Avatar --> */}
                      <div class="freelancer-avatar">
                        <a href="single-freelancer-profile.html">
                          <img src={userAvatarPlaceholder} alt="" />
                        </a>
                      </div>

                      {/* <!-- Name --> */}
                      <div class="freelancer-name">
                        <h4>
                          <a href="#">
                            Gabriel Lagueux{" "}
                            <img
                              class="flag"
                              src={fr}
                              alt=""
                              title="France"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        <span>WordPress Expert</span>
                      </div>

                      {/* <!-- Rating --> */}
                      <div class="freelancer-rating">
                        <div class="star-rating" data-rating="5.0"></div>
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
                            Paris
                          </strong>
                        </li>
                        <li>
                          Rate <strong>$50 / hr</strong>
                        </li>
                        <li>
                          Job Success <strong>100%</strong>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="single-freelancer-profile.html"
                      class="button button-sliding-icon ripple-effect"
                    >
                      View Profile{" "}
                      <i class="icon-material-outline-arrow-right-alt"></i>
                    </a>
                  </div>
                </div>
                {/* <!-- Freelancer / End --> */}
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
      {/* <!-- Counters / End --> */}
        {/* <!-- Logo Carousel --> */}
       

    </div>
  );
}
export default Home;
