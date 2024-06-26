import singleCompany from "../utils/images/browse-companies-03.png";
import de from "../utils/images/flags/de.svg";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
function CompanyDetails() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div class="single-page-header" data-background-image="">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="single-page-header-inner">
                <div class="left-side">
                  <div class="header-image">
                    <img src={singleCompany} alt="" />
                  </div>
                  <div class="header-details">
                    <h3>
                      Acodia <span>Software House</span>
                    </h3>
                    <ul>
                      <li>
                        <div class="star-rating" data-rating="4.9">
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
                <div class="right-side"></div>
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
              <h3 class="margin-bottom-25">About Company</h3>
              <p>
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative approaches to corporate strategy
                foster collaborative thinking to further the overall value
                proposition. Organically grow the holistic world view of
                disruptive innovation via workplace diversity and empowerment.
              </p>

              <p>
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps. Nanotechnology immersion
                along the information highway will close the loop on focusing
                solely on the bottom line.
              </p>
            </div>

            {/* <!-- Boxed List --> */}
            <div class="boxed-list margin-bottom-60">
              <div class="boxed-list-headline">
                <h3>
                  <i class="icon-material-outline-business-center"></i> Open
                  Positions
                </h3>
              </div>

              <div class="listings-container compact-list-layout">
                {/* <!-- Job Listing --> */}
                <a href="single-job-page.html" class="job-listing">
                  {/* <!-- Job Listing Details --> */}
                  <div class="job-listing-details">
                    {/* <!-- Details --> */}
                    <div class="job-listing-description">
                      <h3 class="job-listing-title">Python Developer</h3>

                      {/* <!-- Job Listing Footer --> */}
                      <div class="job-listing-footer">
                        <ul>
                          <li>
                            <i class="icon-material-outline-location-on"></i>{" "}
                            Berlin
                          </li>
                          <li>
                            <i class="icon-material-outline-business-center"></i>{" "}
                            Full Time
                          </li>
                          <li>
                            <i class="icon-material-outline-access-time"></i> 2
                            days ago
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Bookmark --> */}
                  <span class="bookmark-icon"></span>
                </a>

                {/* <!-- Job Listing --> */}
                <a href="single-job-page.html" class="job-listing">
                  {/* <!-- Job Listing Details --> */}
                  <div class="job-listing-details">
                    {/* <!-- Details --> */}
                    <div class="job-listing-description">
                      <h3 class="job-listing-title">
                        Junior Full Stack Developer
                      </h3>

                      {/* <!-- Job Listing Footer --> */}
                      <div class="job-listing-footer">
                        <ul>
                          <li>
                            <i class="icon-material-outline-location-on"></i>{" "}
                            Berlin
                          </li>
                          <li>
                            <i class="icon-material-outline-business-center"></i>{" "}
                            Full Time
                          </li>
                          <li>
                            <i class="icon-material-outline-access-time"></i> 2
                            days ago
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Bookmark --> */}
                  <span class="bookmark-icon"></span>
                </a>
              </div>
            </div>
            {/* <!-- Boxed List / End --> */}

            {/* <!-- Boxed List --> */}
            <div class="boxed-list margin-bottom-60">
              <div class="boxed-list-headline">
                <h3>
                  <i class="icon-material-outline-thumb-up"></i> Reviews
                </h3>
              </div>
              <ul class="boxed-list-ul">
                <li>
                  <div class="boxed-list-item">
                    {/* <!-- Content --> */}
                    <div class="item-content">
                      <h4>
                        Doing things the right way{" "}
                        <span>Anonymous Employee</span>
                      </h4>
                      <div class="item-details margin-top-10">
                        <div class="star-rating" data-rating="5.0">
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                        </div>
                        <div class="detail-item">
                          <i class="icon-material-outline-date-range"></i>{" "}
                          August 2019
                        </div>
                      </div>
                      <div class="item-description">
                        <p>
                          Great company and especially ideal for the
                          career-minded individual. The company is large enough
                          to offer a variety of jobs in all kinds of interesting
                          locations. Even if you never change roles, your job
                          changes and evolves as the company grows, keeping
                          things fresh.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="boxed-list-item">
                    {/* <!-- Content --> */}
                    <div class="item-content">
                      <h4>
                        Outstanding Work Environment{" "}
                        <span>Anonymous Employee</span>
                      </h4>
                      <div class="item-details margin-top-10">
                        <div class="star-rating" data-rating="5.0">
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                          <span class="star"></span>
                        </div>
                        <div class="detail-item">
                          <i class="icon-material-outline-date-range"></i> May
                          2019
                        </div>
                      </div>
                      <div class="item-description">
                        <p>
                          They do business with integrity and rational thinking.
                          Overall, it's an excellent place to work, with
                          products that are winning in the marketplace.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <div class="centered-button margin-top-35">
                <a
                  href="#small-dialog"
                  class="popup-with-zoom-anim button button-sliding-icon"
                >
                  Leave a Review{" "}
                  <i class="icon-material-outline-arrow-right-alt"></i>
                </a>
              </div>
            </div>
            {/* <!-- Boxed List / End --> */}
          </div>

          {/* <!-- Sidebar --> */}
          <div class="col-xl-4 col-lg-4">
            <div class="sidebar-container">
              {/* <!-- Location --> */}
              <div class="sidebar-widget">
                <h3>Location</h3>
                <div id="single-job-map-container">
                  <div
                    id="singleListingMap"
                    data-latitude="52.520007"
                    data-longitude="13.404954"
                    data-map-icon="im im-icon-Hamburger"
                  ></div>
                  <a href="#" id="streetView">
                    Street View
                  </a>
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
      <div id="small-dialog" class="zoom-anim-dialog mfp-hide dialog-with-tabs">
        {/* <!--Tabs --> */}
        <div class="sign-in-form">
          <ul class="popup-tabs-nav">
            <li>
              <a href="#tab">Leave a Review</a>
            </li>
          </ul>

          <div class="popup-tabs-container">
            {/* <!-- Tab --> */}
            <div class="popup-tab-content" id="tab">
              {/* <!-- Welcome Text --> */}
              <div class="welcome-text">
                <h3>What is it like to work at Acodia?</h3>
              </div>

              {/* <!-- Form --> */}
              <form method="post" id="leave-company-review-form">
                {/* <!-- Leave Rating --> */}
                <div class="clearfix"></div>
                <div class="leave-rating-container">
                  <div class="leave-rating margin-bottom-5">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-1"
                      value="1"
                      required
                    />
                    <label
                      for="rating-1"
                      class="icon-material-outline-star"
                    ></label>
                    <input
                      type="radio"
                      name="rating"
                      id="rating-2"
                      value="2"
                      required
                    />
                    <label
                      for="rating-2"
                      class="icon-material-outline-star"
                    ></label>
                    <input
                      type="radio"
                      name="rating"
                      id="rating-3"
                      value="3"
                      required
                    />
                    <label
                      for="rating-3"
                      class="icon-material-outline-star"
                    ></label>
                    <input
                      type="radio"
                      name="rating"
                      id="rating-4"
                      value="4"
                      required
                    />
                    <label
                      for="rating-4"
                      class="icon-material-outline-star"
                    ></label>
                    <input
                      type="radio"
                      name="rating"
                      id="rating-5"
                      value="5"
                      required
                    />
                    <label
                      for="rating-5"
                      class="icon-material-outline-star"
                    ></label>
                  </div>
                </div>
                <div class="clearfix"></div>
                {/* <!-- Leave Rating / End--> */}

                <div class="row">
                  <div class="col-xl-12">
                    <div
                      class="input-with-icon-left"
                      title="Leave blank to add review anonymously"
                      data-tippy-placement="bottom"
                    >
                      <i class="icon-material-outline-account-circle"></i>
                      <input
                        type="text"
                        class="input-text with-border"
                        name="name"
                        id="name"
                        placeholder="First and Last Name"
                      />
                    </div>
                  </div>

                  <div class="col-xl-12">
                    <div class="input-with-icon-left">
                      <i class="icon-material-outline-rate-review"></i>
                      <input
                        type="text"
                        class="input-text with-border"
                        name="reviewtitle"
                        id="reviewtitle"
                        placeholder="Review Title"
                        required
                      />
                    </div>
                  </div>
                </div>

                <textarea
                  class="with-border"
                  placeholder="Review"
                  name="message"
                  id="message"
                  cols="7"
                  required
                ></textarea>
              </form>

              {/* <!-- Button --> */}
              <button
                class="button margin-top-35 full-width button-sliding-icon ripple-effect"
                type="submit"
                form="leave-company-review-form"
              >
                Leave a Review{" "}
                <i class="icon-material-outline-arrow-right-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CompanyDetails;
