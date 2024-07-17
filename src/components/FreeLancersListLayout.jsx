import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { getCountryFlag } from "../utils/common";
import avatar from "../utils/images/Svgs/no-avatar-image.svg";
function FreeLancersListLayout() {
  const navigate = useNavigate();
  const { freelancers } = useContext(UserContext);
  const [locationInput, setLocationInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
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
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // Function to add a new tag
  const handleAddTag = () => {
    if (newTag.trim() === "") return;

    const id = newTag.toLowerCase().replace(/\s+/g, "-");
    if (!tags.some((tag) => tag.id === id)) {
      setTags([...tags, { id, name: newTag, checked: false }]);
      setNewTag("");
    }
  };

  // Function to handle pressing the Enter key to add a tag
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTag();
    }
  };

  // Function to toggle the checked state of a tag
  const handleCheckboxChange = (id) => {
    setTags(
      tags.map((tag) =>
        tag.id === id ? { ...tag, checked: !tag.checked } : tag
      )
    );
  };

  // Function to handle category selection
  const handleSelect = (category) => {
    setSelectedCategory(category);
  };
console.log({freelancers});
  // Filter freelancers based on location and selected tags
  const filteredFreelancers = freelancers.filter((freelancer) => {
    const locationMatch =
      locationInput.trim() === "" ||
      freelancer?.data?.location
        ?.toLowerCase()
        .includes(locationInput.toLowerCase());

    const selectedTags = tags.filter((tag) => tag.checked).map((tag) => tag.id);
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) =>
        freelancer?.data?.skills?.toLowerCase().includes(tag)
      );
    //   const categoryMatch = selectedCategory.trim() === 'All categories' ||
    // freelancer?.category?.toLowerCase().includes(selectedCategory.toLowerCase());

    // Final filter condition combining location, tags,  and category
    return locationMatch && tagsMatch;
  });

  return (
    <div className="container margin-top-90">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <div className="sidebar-container">
            {/* Location */}
            <div className="sidebar-widget">
              <h3>Location</h3>
              <div className="input-with-icon">
                <div id="autocomplete-container">
                  <input
                    placeholder="Location"
                    id="autocomplete-input"
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                  />
                </div>
                <i className="icon-material-outline-location-on"></i>
              </div>
            </div>

            {/* Category */}
            <div className="sidebar-widget">
              <h3>Category</h3>
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

            {/* Skills */}
            <div className="sidebar-widget">
              <h3>Skills</h3>
              <div className="keywords-container margin-top-20">
                <div className="keyword-input-container">
                  <input
                    type="text"
                    className="keyword-input"
                    placeholder="add more skills"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="keyword-input-button ripple-effect"
                    onClick={handleAddTag}
                  >
                    <i className="icon-material-outline-add"></i>
                  </button>
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="tags-container" style={{ marginTop: "30px" }}>
                {tags.map((tag) => (
                  <div className="tag" key={tag.id}>
                    <input
                      type="checkbox"
                      id={tag.id}
                      checked={tag.checked}
                      onChange={() => handleCheckboxChange(tag.id)}
                    />
                    <label htmlFor={tag.id}>{tag.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8 content-left-offset">
          <h3 className="page-title">Search Results</h3>
          <div
            className="notify-box margin-top-15"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="switch-container">
              <label className="switch">
                <input type="checkbox" />
                <span className="switch-button"></span>
                <span className="switch-text">
                  Turn on email alerts for this search
                </span>
              </label>
            </div>
            {/* <div style={{ display: "flex", gap: "5px", flexWrap: "nowrap" }}>
              <div style={{ display: "flex", flexWrap: "nowrap", alignItems: 'center' }}>
                Sort by:
              </div>
              <select>
                <option value="relevance" selected>Relevance</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="random">Random</option>
              </select>
            </div> */}
          </div>

          {/* Freelancers List Container */}
          <div
            className="freelancers-container freelancers-list-layout compact-list margin-top-35"
            style={{ flexDirection: "column" }}
          >
            {filteredFreelancers.length > 0 ? (
              filteredFreelancers.map((freelancer) => (
                <div className="freelancer" key={freelancer.id}>
                  {/* Overview */}
                  <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">
                      {/* Bookmark Icon */}
                      <span className="bookmark-icon"></span>
                      {/* Avatar */}
                      <div className="freelancer-avatar">
                        <a href="single-freelancer-profile.html">
                          <img src={avatar} alt="" />
                        </a>
                      </div>
                      {/* Name */}
                      <div className="freelancer-name">
                        <h4>
                          <a href="#">
                            {freelancer?.name}{" "}
                            <img
                              className="flag"
                              src={getCountryFlag(freelancer?.data?.location)}
                              alt=""
                              title="Country"
                              data-tippy-placement="top"
                            />
                          </a>
                        </h4>
                        {/* Rating */}
                        <div
                          class="star-rate"
                          data-rating={freelancer?.rating ?? 0}
                        >
                          {Array.from({ length: 5 }, (_, index) => (
                            <span
                              key={index}
                              className={`star ${
                                index < freelancer?.rating
                                  ? "filled"
                                  : "empty"
                              }`}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="freelancer-details">
                    <div className="freelancer-details-list">
                      <ul>
                        <li>
                          Location{" "}
                          <strong>
                            <i className="icon-material-outline-location-on"></i>{" "}
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
                        navigate(`/freelancer/details/${freelancer._id}`);
                      }}
                      className="button button-sliding-icon ripple-effect white-text-button"
                    >
                      View Profile{" "}
                      <i className="icon-material-outline-arrow-right-alt"></i>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-freelancer">No freelancers found.</p>
            )}
          </div>

          {/* Pagination
          {filteredFreelancers.length > 5 && (
            <div className="pagination-container margin-top-40 margin-bottom-60">
              <nav className="pagination">
                <ul>
                  <li className="pagination-arrow">
                    <a href="#" className="ripple-effect">
                      <i className="icon-material-outline-keyboard-arrow-left"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="ripple-effect">1</a>
                  </li>
                  <li>
                    <a href="#" className="current-page ripple-effect">2</a>
                  </li>
                  <li>
                    <a href="#" className="ripple-effect">3</a>
                  </li>
                  <li>
                    <a href="#" className="ripple-effect">4</a>
                  </li>
                  <li className="pagination-arrow">
                    <a href="#" className="ripple-effect">
                      <i className="icon-material-outline-keyboard-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default FreeLancersListLayout;
