import logo2 from "../utils/images/logo2.png";
import ApplyJobPopup from "./modals/ApplyJobPopup";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Footer()
 {
    const navigate = useNavigate();
  return (
    //         <!-- Footer
    // ================================================== -->
    <div id="footer">
      {/* <!-- Footer Top Section --> */}
      <div class="footer-top-section">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              {/* <!-- Footer Rows Container --> */}
              <div class="footer-rows-container">
                {/* <!-- Left Side --> */}
                <div class="footer-rows-left">
                  <div class="footer-row">
                    <div class="footer-row-inner footer-logo">
                      <img src={logo2} alt="" />
                    </div>
                  </div>
                </div>

                {/* <!-- Right Side --> */}
                <div class="footer-rows-right">
                  {/* <!-- Social Icons --> */}
                  <div class="footer-row">
                    <div class="footer-row-inner">
                      <ul class="footer-social-links">
                        <li>
                          <a
                            href="#"
                            title="Facebook"
                            data-tippy-placement="bottom"
                            data-tippy-theme="light"
                          >
                            <i class="icon-brand-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            title="Twitter"
                            data-tippy-placement="bottom"
                            data-tippy-theme="light"
                          >
                            <i class="icon-brand-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            title="Google Plus"
                            data-tippy-placement="bottom"
                            data-tippy-theme="light"
                          >
                            <i class="icon-brand-google-plus-g"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            title="LinkedIn"
                            data-tippy-placement="bottom"
                            data-tippy-theme="light"
                          >
                            <i class="icon-brand-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                      <div class="clearfix"></div>
                    </div>
                  </div>

                  {/* <!-- Language Switcher --> */}
                  <div class="footer-row">
                    <div class="footer-row-inner">
                      <select
                        class="selectpicker language-switcher"
                        data-selected-text-format="count"
                        data-size="5"
                      >
                        <option selected>English</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Footer Rows Container / End --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer Top Section / End --> */}

      {/* <!-- Footer Middle Section --> */}
      <div class="footer-middle-section">
        <div class="container">
          <div class="row">
            {/* <!-- Links --> */}
            <div class="col-xl-2 col-lg-2 col-md-3">
              <div class="footer-links">
                <h3>For Candidates</h3>
                <ul>
                  <li>
                    <a onClick={() => {
                          navigate("/jobs");
                        }}>
                      <span>Browse Jobs</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>Add Resume</span>
                    </a>
                  </li>
                  <li>
                  <a onClick={() => {
                          navigate("/dashboard/bookmarks/");
                        }}>
                      <span>My Bookmarks</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- Links --> */}
            <div class="col-xl-2 col-lg-2 col-md-3">
              <div class="footer-links">
                <h3>For Employers</h3>
                <ul>
                  <li>
                  <a onClick={() => {
                          navigate("/freelancers");
                        }}>
                      <span>Browse Candidates</span>
                    </a>
                  </li>
                  <li>
                  <a onClick={() => {
                          navigate("/dashboard/PostJob");
                        }}>
                      <span>Post a Job</span>
                    </a>
                  </li>
                  <li>
                  <a onClick={() => {
                          navigate("/dashboard/PostTask");
                        }}>
                      <span>Post a Task</span>
                    </a>
                  </li>
                  <li>
                  <a onClick={() => {
                          navigate("/pricing");
                        }}>
                      <span>Plans & Pricing</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- Links --> */}
            <div class="col-xl-2 col-lg-2 col-md-3">
              <div class="footer-links">
                <h3>Helpful Links</h3>
                <ul>
                  <li>
                  <a onClick={() => {
                          navigate("/contact");
                        }}>
                      <span>Contact</span>
                    </a>
                  </li>
                  <li>
                  </li>
                  <li>
                   
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- Links --> */}
            <div class="col-xl-2 col-lg-2 col-md-3">
              <div class="footer-links">
                <h3>Account</h3>
                <ul>
                  <li>
                  <a onClick={() => {
                          navigate("/register");
                        }}>
                      <span>Log In</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>My Account</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- Newsletter --> */}
            <div class="col-xl-4 col-lg-4 col-md-12">
              <h3>
                <i class="icon-feather-mail"></i> Sign Up For a Newsletter
              </h3>
              <p style={{padding: 0}}>
                Weekly breaking news, analysis and cutting edge advices on job
                searching.
              </p>
              <form action="#" method="get" class="newsletter">
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter your email address"
                />
                <button type="submit">
                  <i class="icon-feather-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer Middle Section / End --> */}

      {/* <!-- Footer Copyrights --> */}
      <div class="footer-bottom-section">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              ©2024<strong>Bid Bridge</strong>. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer Copyrights / End --> */}
    </div>
  );
}
export default Footer;
