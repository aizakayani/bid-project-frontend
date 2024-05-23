import userAvatarBig2 from "../utils/images/user-avatar-big-02.jpg";
import de from "../utils/images/flags/de.svg";
import sk from "../utils/images/flags/sk.svg";
import pl from "../utils/images/flags/pl.svg";
import userAvatarPlaceholder from "../utils/images/user-avatar-placeholder.png";
function DashboardManageBidders() {
  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>Manage Bidders</h3>
          <span class="margin-top-7">
            Bids for <a href="#">Food Delivery Mobile Application</a>
          </span>

          {/* <!-- Breadcrumbs --> */}
          <nav id="breadcrumbs" class="dark">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>Manage Bidders</li>
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
                  <i class="icon-material-outline-supervisor-account"></i> 3
                  Bidders
                </h3>
                <div class="sort-by">
                  <select class="selectpicker hide-tick">
                    <option>Highest First</option>
                    <option>Lowest First</option>
                    <option>Fastest First</option>
                  </select>
                </div>
              </div>

              <div class="content">
                <ul class="dashboard-box-list">
                  <li>
                    {/* <!-- Overview --> */}
                    <div class="freelancer-overview manage-candidates">
                      <div class="freelancer-overview-inner">
                        {/* <!-- Avatar --> */}
                        <div class="freelancer-avatar">
                          <div class="verified-badge"></div>
                          <a href="#">
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

                          {/* <!-- Details --> */}
                          <span class="freelancer-detail-item">
                            <a href="#">
                              <i class="icon-feather-mail"></i>{" "}
                              david@example.com
                            </a>
                          </span>

                          {/* <!-- Rating --> */}
                          <div class="freelancer-rating">
                            <div class="star-rating" data-rating="5.0"></div>
                          </div>

                          {/* <!-- Bid Details --> */}
                          <ul class="dashboard-task-info bid-info">
                            <li>
                              <strong>$3,200</strong>
                              <span>Fixed Price</span>
                            </li>
                            <li>
                              <strong>14 Days</strong>
                              <span>Delivery Time</span>
                            </li>
                          </ul>

                          {/* <!-- Buttons --> */}
                          <div class="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                            <a
                              href="#small-dialog-1"
                              class="popup-with-zoom-anim button ripple-effect"
                            >
                              <i class="icon-material-outline-check"></i> Accept
                              Offer
                            </a>
                            <a
                              href="#small-dialog-2"
                              class="popup-with-zoom-anim button dark ripple-effect"
                            >
                              <i class="icon-feather-mail"></i> Send Message
                            </a>
                            <a
                              href="#"
                              class="button gray ripple-effect ico"
                              title="Remove Bid"
                              data-tippy-placement="top"
                            >
                              <i class="icon-feather-trash-2"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    {/* <!-- Overview --> */}
                    <div class="freelancer-overview manage-candidates">
                      <div class="freelancer-overview-inner">
                        {/* <!-- Avatar --> */}
                        <div class="freelancer-avatar">
                          <a href="#">
                            <img
                              src={userAvatarPlaceholder}
                              alt=""
                            />
                          </a>
                        </div>

                        {/* <!-- Name --> */}
                        <div class="freelancer-name">
                          <h4>
                            <a href="#">
                              Oldrich Ćuk{" "}
                              <img
                                class="flag"
                                src={sk}
                                alt=""
                                title="Slovakia"
                                data-tippy-placement="top"
                              />
                            </a>
                          </h4>

                          {/* <!-- Details --> */}
                          <span class="freelancer-detail-item">
                            <a href="#">
                              <i class="icon-feather-mail"></i>{" "}
                              oldrich@example.com
                            </a>
                          </span>
                          <span class="freelancer-detail-item">
                            <i class="icon-feather-phone"></i> (+421)
                            123-456-789
                          </span>

                          {/* <!-- Rating --> */}
                          <br></br>
                          <span class="company-not-rated">
                            Minimum of 3 votes required
                          </span>

                          {/* <!-- Bid Details --> */}
                          <ul class="dashboard-task-info bid-info">
                            <li>
                              <strong>$3,000</strong>
                              <span>Fixed Price</span>
                            </li>
                            <li>
                              <strong>14 Days</strong>
                              <span>Delivery Time</span>
                            </li>
                          </ul>

                          {/* <!-- Buttons --> */}
                          <div class="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                            <a
                              href="#small-dialog-1"
                              class="popup-with-zoom-anim button ripple-effect"
                            >
                              <i class="icon-material-outline-check"></i> Accept
                              Offer
                            </a>
                            <a
                              href="#small-dialog-2"
                              class="popup-with-zoom-anim button dark ripple-effect"
                            >
                              <i class="icon-feather-mail"></i> Send Message
                            </a>
                            <a
                              href="#"
                              class="button gray ripple-effect ico"
                              title="Remove Bid"
                              data-tippy-placement="top"
                            >
                              <i class="icon-feather-trash-2"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    {/* <!-- Overview --> */}
                    <div class="freelancer-overview manage-candidates">
                      <div class="freelancer-overview-inner">
                        {/* <!-- Avatar --> */}
                        <div class="freelancer-avatar">
                          <div class="verified-badge"></div>
                          <a href="#">
                            <img
                              src={userAvatarPlaceholder}
                              alt=""
                            />
                          </a>
                        </div>

                        {/* <!-- Name --> */}
                        <div class="freelancer-name">
                          <h4>
                            <a href="#">
                              Kuba Adamczyk{" "}
                              <img
                                class="flag"
                                src={pl}
                                alt=""
                                title="Poland"
                                data-tippy-placement="top"
                              />
                            </a>
                          </h4>

                          {/* <!-- Details --> */}
                          <span class="freelancer-detail-item">
                            <a href="#">
                              <i class="icon-feather-mail"></i> kuba@example.com
                            </a>
                          </span>
                          <span class="freelancer-detail-item">
                            <i class="icon-feather-phone"></i> (+48) 123-456-789
                          </span>

                          {/* <!-- Rating --> */}
                          <div class="freelancer-rating">
                            <div class="star-rating" data-rating="5.0"></div>
                          </div>

                          {/* <!-- Bid Details --> */}
                          <ul class="dashboard-task-info bid-info">
                            <li>
                              <strong>$2,700</strong>
                              <span>Fixed Price</span>
                            </li>
                            <li>
                              <strong>30 Days</strong>
                              <span>Delivery Time</span>
                            </li>
                          </ul>

                          {/* <!-- Buttons --> */}
                          <div class="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                            <a
                              href="#small-dialog-1"
                              class="popup-with-zoom-anim button ripple-effect"
                            >
                              <i class="icon-material-outline-check"></i> Accept
                              Offer
                            </a>
                            <a
                              href="#small-dialog-2"
                              class="popup-with-zoom-anim button dark ripple-effect"
                            >
                              <i class="icon-feather-mail"></i> Send Message
                            </a>
                            <a
                              href="#"
                              class="button gray ripple-effect ico"
                              title="Remove Bid"
                              data-tippy-placement="top"
                            >
                              <i class="icon-feather-trash-2"></i>
                            </a>
                          </div>
                        </div>
                      </div>
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
export default DashboardManageBidders;
