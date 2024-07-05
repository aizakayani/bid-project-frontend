import it from "../utils/images/flags/it.svg";
import userAvatarBig1 from "../utils/images/user-avatar-big-01.jpg";
import userAvatarBig2 from "../utils/images/user-avatar-big-02.jpg";
import userAvatarBig3 from "../utils/images/user-avatar-big-03.jpg";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { getCountryFlag } from "../utils/common";
function FreeLancersListLayout() {
  const navigate = useNavigate();
  const { freelancers } = useContext(UserContext);
  console.log({freelancers});
  // const freelancersList = [
  //   // {
  //   //   name: "Sebastiano Piccio",
  //   //   avatar: userAvatarBig1,
  //   //   title: "Laravel Dev",
  //   //   location: "Milan",
  //   //   rate: "$80 / hr",
  //   //   jobSuccessRate: "89%",
  //   // },
  // ];
  const [locationInput, setLocationInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [tags, setTags] = useState({
    frontend: false,
    angular: false,
    react: false,
    vuejs: false,
    webapp: false,
    design: false,
    wordpress: false,
  });
  const [selectedCategory, setSelectedCategory] = useState(
    "Admin Support"
  );
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
  const filteredFreelancers = freelancers.filter((freelancer) => {
    const locationMatch = freelancer?.location?.toLowerCase().includes(locationInput?.toLowerCase());
    const skillsMatch = freelancer?.data?.skills.toLowerCase().includes(skillsInput?.toLowerCase());

    // Get selected tags
    const selectedTags = Object.keys(tags).filter((tag) => tags[tag]);

    // Check if at least one selected tag exists in freelancers tags (using freelancer title as tag name)
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) =>
        freelancer?.data?.skills.toLowerCase().includes(tag?.toLowerCase())
      );
console.log({})
    return locationMatch && skillsMatch && tagMatch;
  });
  const handleSelect = (category) => {
    setSelectedCategory(category);
  };
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    console.log({ checked });
    console.log({ id });
    setTags({
      ...tags,
      [id]: checked,
    });
  };
  
  console.log({freelancers});
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
                    placeholder="Location"
                    id="autocomplete-input"
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                  />
                </div>
                <i class="icon-material-outline-location-on"></i>
              </div>
            </div>

            {/* <!-- Category --> */}
            <div class="sidebar-widget">
              <h3>Category</h3>
              {/* <select
                class="selectpicker default"
                multiple
                data-selected-text-format="count"
                data-size="7"
                title="All Categories"
              >
                <option>Admin Support</option>
                <option>Customer Service</option>
                <option>Data Analytics</option>
                <option>Design & Creative</option>
                <option>Legal</option>
                <option>Software Developing</option>
                <option>IT & Networking</option>
                <option>Writing</option>
                <option>Translation</option>
                <option>Sales & Marketing</option>
              </select> */}
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  className="w-100"
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

            {/* <!-- Keywords --> */}
            <div class="sidebar-widget">
              <h3>Keywords</h3>
              <div class="keywords-container">
                <div class="keyword-input-container">
                  <input
                    id="intro-keywords"
                    placeholder="Job Title"
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
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

            {/* <!-- Tags --> */}
            <div class="sidebar-widget">
              <h3>Skills</h3>

              <div class="tags-container">
                <div class="tag">
                  <input type="checkbox"
                    id="frontend"
                    checked={tags.frontend}
                    onChange={handleCheckboxChange} />
                  <label for="tag1">front-end dev</label>
                </div>
                <div class="tag">
                  <input type="checkbox"
                    id="angular"
                    checked={tags.angular}
                    onChange={handleCheckboxChange} />
                  <label for="tag2">angular</label>
                </div>
                <div class="tag">
                  <input type="checkbox"
                    id="react"
                    checked={tags.react}
                    onChange={handleCheckboxChange} />
                  <label for="tag3">react</label>
                </div>
                <div class="tag">
                  <input
                    type="checkbox"
                    id="vuejs"
                    checked={tags.vuejs}
                    onChange={handleCheckboxChange}
                  />
                  <label for="vuejs">vue js</label>
                </div>
                <div class="tag">
                  <input
                    type="checkbox"
                    id="webapp"
                    checked={tags.webapp}
                    onChange={handleCheckboxChange}
                  />
                  <label for="webapp">web apps</label>
                </div>
                <div class="tag">
                  <input
                    type="checkbox"
                    id="design"
                    checked={tags.design}
                    onChange={handleCheckboxChange}
                  />
                  <label for="design">design</label>
                </div>
                <div class="tag">
                  <input
                    type="checkbox"
                    id="wordpress"
                    checked={tags.wordpress}
                    onChange={handleCheckboxChange}
                  />
                  <label for="wordpress">wordpress</label>
                </div>
              </div>
              <div class="clearfix"></div>

              {/* <!-- More Skills --> */}
              <div class="keywords-container margin-top-20">
                <div class="keyword-input-container">
                  <input
                    type="text"
                    class="keyword-input"
                    placeholder="add more skills"
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
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-8 content-left-offset">
          <h3 class="page-title">Search Results</h3>

          <div
            class="notify-box margin-top-15"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div class="switch-container">
              <label class="switch">
                <input type="checkbox" />
                <span class="switch-button"></span>
                <span class="switch-text">
                  Turn on email alerts for this search
                </span>
              </label>
            </div>
            <div style={{ display: "flex", gap: "5px", flexWrap: "nowrap" }}>
              <div style={{ display: "flex", flexWrap: "nowrap", alignItems: 'center'}}>
                Sort by:
              </div>
              <select>
                <option value="relevance" selected>
                  Relevance
                </option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="random">Random</option>
              </select>
            </div>
          </div>

          {/* <!-- Freelancers List Container --> */}
          <div
            class="freelancers-container freelancers-list-layout compact-list margin-top-35"
            style={{ flexDirection: "column" }}
          >
            {/* <!--Freelancer --> */}
            {filteredFreelancers?.length > 0 &&
              filteredFreelancers.map((freelancer) => {
                return (
                  <div class="freelancer">
                    {/* <!-- Overview --> */}
                    <div class="freelancer-overview">
                      <div class="freelancer-overview-inner">
                        {/* <!-- Bookmark Icon --> */}
                        <span class="bookmark-icon"></span>

                        {/* <!-- Avatar --> */}
                        <div class="freelancer-avatar">
                          <a href="single-freelancer-profile.html">
                            <img src={freelancer?.avatar} alt="" />
                          </a>
                        </div>

                        {/* <!-- Name --> */}
                        <div class="freelancer-name">
                          <h4>
                            <a href="#">
                              {freelancer?.name}{" "}
                              <img
                                class="flag"
                                src={getCountryFlag(
                                  freelancer?.data?.location
                                )}
                                alt=""
                                title="Italy"
                                data-tippy-placement="top"
                              />
                            </a>
                          </h4>
                          {/* <!-- Rating --> */}
                          <div class="freelancer-rating">
                            <div class="star-rating" data-rating="4.5">
                              <span class="star"></span>
                              <span class="star"></span>
                              <span class="star"></span>
                              <span class="star"></span>
                              <span class="star"></span>
                            </div>
                          </div>
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
                              {freelancer?.data?.location}
                            </strong>
                          </li>
                          <li>
                            Rate <strong>{freelancer?.data?.hourlyRate}</strong>
                          </li>
                        </ul>
                      </div>
                      <a
                        onClick={() => {
                          navigate("/freelancer/details/:id");
                        }}
                        class="button button-sliding-icon ripple-effect white-text-button"
                      >
                        View Profile{" "}
                        <i class="icon-material-outline-arrow-right-alt"></i>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <!-- Freelancers Container / End --> */}

          {/* <!-- Pagination --> */}
          <div class="clearfix"></div>
          <div class="row">
            <div class="col-md-12">
              {/* <!-- Pagination --> */}
              {filteredFreelancers?.length > 5 && (
                <div class="pagination-container margin-top-40 margin-bottom-60">
                  <nav class="pagination">
                    <ul>
                      <li class="pagination-arrow">
                        <a href="#" class="ripple-effect">
                          <i class="icon-material-outline-keyboard-arrow-left"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="ripple-effect">
                          1
                        </a>
                      </li>
                      <li>
                        <a href="#" class="current-page ripple-effect">
                          2
                        </a>
                      </li>
                      <li>
                        <a href="#" class="ripple-effect">
                          3
                        </a>
                      </li>
                      <li>
                        <a href="#" class="ripple-effect">
                          4
                        </a>
                      </li>
                      <li class="pagination-arrow">
                        <a href="#" class="ripple-effect">
                          <i class="icon-material-outline-keyboard-arrow-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
          {/* <!-- Pagination / End --> */}
        </div>
      </div>
    </div>
  );
}
export default FreeLancersListLayout;
