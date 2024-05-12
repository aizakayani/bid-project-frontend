import companyLogoPlaceholder from "../utils/images/company-logo-placeholder.png";
import browseCompanies2 from "../utils/images/browse-companies-02.png";
import browseCompanies3 from "../utils/images/browse-companies-03.png";
import browseCompanies4 from "../utils/images/browse-companies-04.png";
import { useNavigate } from "react-router-dom";
function BrowseCompanies() {
    const navigate = useNavigate();
  return (
    <>
      <div id="titlebar" class="gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Browse Companies</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container margin-bottom-70 margin-top-70">
        <div class="row">
          <div class="col-xl-12">
            <div class="letters-list">
              <a href="#" class="current">
                A
              </a>
              <a href="#">B</a>
              <a href="#">C</a>
              <a href="#">D</a>
              <a href="#">E</a>
              <a href="#">F</a>
              <a href="#">G</a>
              <a href="#">H</a>
              <a href="#">I</a>
              <a href="#">J</a>
              <a href="#">K</a>
              <a href="#">L</a>
              <a href="#">M</a>
              <a href="#">N</a>
              <a href="#">O</a>
              <a href="#">P</a>
              <a href="#">Q</a>
              <a href="#">R</a>
              <a href="#">S</a>
              <a href="#">T</a>
              <a href="#">U</a>
              <a href="#">V</a>
              <a href="#">W</a>
              <a href="#">X</a>
              <a href="#">Y</a>
              <a href="#">Z</a>
            </div>
          </div>
          <div class="col-xl-12">
            <div class="companies-list">
              <a onClick={() => navigate("/company/details")} class="company">
                <div class="company-inner-alignment">
                  <span class="company-logo">
                    <img src={companyLogoPlaceholder} alt="" />
                  </span>
                  <h4>Acra</h4>
                  <div class="star-rating" data-rating="3.5">
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                  </div>
                </div>
              </a>
              <a onClick={() => navigate("/company/details")} class="company">
                <div class="company-inner-alignment">
                  <span class="company-logo">
                    <img src={browseCompanies2} alt="" />
                  </span>
                  <h4>Acue</h4>
                  <div class="star-rating" data-rating="5.0">
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                  </div>
                </div>
              </a>
              <a onClick={() => navigate("/company/details")} class="company">
                <div class="company-inner-alignment">
                  <span class="company-logo">
                    <img src={browseCompanies4} alt="" />
                  </span>
                  <h4>Acorta</h4>
                  <span class="company-not-rated">
                    Minimum of 3 votes required
                  </span>
                </div>
              </a>
              <a onClick={() => navigate("/company/details")} class="company">
                <div class="company-inner-alignment">
                  <span class="company-logo">
                    <img src={browseCompanies3} alt="" />
                  </span>
                  <h4>Acuneol</h4>
                  <span class="company-not-rated">
                    Minimum of 3 votes required
                  </span>
                </div>
              </a>
              <a onClick={() => navigate("/company/details")} class="company">
                <div class="company-inner-alignment">
                  <span class="company-logo">
                    <img src="images/browse-companies-03.png" alt="" />
                  </span>
                  <h4>Acodia</h4>
                  <div class="star-rating" data-rating="4.9">
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                  </div>
                </div>
              </a>
              <a onClick={() => navigate("/company/details")} class="company">
                <div class="company-inner-alignment">
                  <span class="company-logo">
                    <img src="images/company-logo-placeholder.png" alt="" />
                  </span>
                  <h4>Acagic</h4>
                  <span class="company-not-rated">
                    Minimum of 3 votes required
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BrowseCompanies;
