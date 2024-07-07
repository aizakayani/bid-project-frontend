import { useNavigate } from "react-router-dom";
import companyLogo05 from "../utils/images/company-logo-05.png";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { timeDifferenceFromNow } from "../utils/utils";
import { Dropdown } from "react-bootstrap";
import { updateUserAPI } from "../services/user";

function JobsListLayout() {
  const navigate = useNavigate();
  const { jobsList, user, setUser } = useContext(UserContext);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  useEffect(() => {
    if (user?.data?.bookmarkedJobs?.length) {
      setBookmarkedJobs([...user?.data?.bookmarkedJobs]);
    }
  }, [user]);

  const handleUpdateBookmarkedJobs = async (jobId) => {
    const bookmarksCopy = [...bookmarkedJobs];
    const index = bookmarksCopy.indexOf(jobId);

    if (index !== -1) {
      // If jobId exists, remove it from the array
      bookmarksCopy.splice(index, 1);
    } else {
      // If jobId does not exist, add it to the array
      bookmarksCopy.push(jobId);
    }
    // send API call
    try {
      const data = user?.data || {};
      data.bookmarkedJobs = bookmarksCopy?.length > 0 ? [...bookmarksCopy] : [];
      const updateResult = await updateUserAPI({ data });
      if (updateResult?.success && updateResult?.user) {
        setUser(updateResult?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [locationInput, setLocationInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [tags, setTags] = useState([]);
  const [jobTypes, setJobTypes] = useState({
    freelance: false,
    fulltime: false,
    parttime: false,
    internship: false,
    temporary: false,
  });
  console.log({ jobTypes });

  const categories = [
    "Accounting and Finance",
    "Clerical & Data Entry",
    "Counseling",
    "Court Administration",
    "Human Resources",
    "Investigative",
    "IT and Computers",
    "Law Enforcement",
    "Management",
    "Miscellaneous",
    "Public Relations",
  ];

  // Function to add a new tag
  const handleAddTag = () => {
    const newTag = titleInput.trim().toLowerCase();
    if (newTag === "") return;

    const id = newTag.replace(/\s+/g, "-");
    if (!tags.some((tag) => tag.id === id)) {
      setTags([...tags, { id, name: newTag, checked: false }]);
      setTitleInput("");
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

  // Function to toggle job types
  const handleJobTypeToggle = (type) => {
    setJobTypes({ ...jobTypes, [type]: !jobTypes[type] });
  };

  // Filter jobs based on location and selected tags and job type
  const filteredJobs = jobsList.filter((job) => {
    // Normalize job.type to lowercase and remove spaces
    const normalizedJobType = job.type.toLowerCase().replace(/\s+/g, "");

    // Match location
    const locationMatch =
      locationInput.trim() === "" ||
      job?.location?.toLowerCase().includes(locationInput.toLowerCase());

    // Match tags
    const selectedTags = tags.filter((tag) => tag.checked).map((tag) => tag.id);
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => job?.title?.toLowerCase().includes(tag));

    // Match job type with normalized strings
    const anyJobTypeToggled = Object.values(jobTypes).some((value) => value);

    // If no job type is toggled on, consider all job types
    const jobTypeMatch =
      !anyJobTypeToggled ||
      (jobTypes.freelance && normalizedJobType === "freelance") ||
      (jobTypes.fulltime && normalizedJobType === "fulltime") ||
      (jobTypes.parttime && normalizedJobType === "parttime") ||
      (jobTypes.internship && normalizedJobType === "internship") ||
      (jobTypes.temporary && normalizedJobType === "temporary");
    const categoryMatch =
      selectedCategory.trim() === "All categories" ||
      job?.category?.toLowerCase().includes(selectedCategory.toLowerCase());

    // Final filter condition combining location, tags, job type, and category
    return locationMatch && tagsMatch && jobTypeMatch && categoryMatch;
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

            {/* Keywords */}
            <div className="sidebar-widget">
              <h3>Keywords</h3>
              <div className="keywords-container">
                <div className="keyword-input-container">
                  <input
                    id="intro-keywords"
                    placeholder="Job Title"
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleAddTag();
                    }}
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

            {/* Job Type */}
            <div className="sidebar-widget">
              <h3>Job Type</h3>
              <div className="switches-list">
                <div className="switch-container">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={jobTypes.freelance}
                      onChange={() => handleJobTypeToggle("freelance")}
                    />
                    <span className="switch-button"></span> Freelance
                  </label>
                </div>

                <div className="switch-container">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={jobTypes.fulltime}
                      onChange={() => handleJobTypeToggle("fulltime")}
                    />
                    <span className="switch-button"></span> Full Time
                  </label>
                </div>

                <div className="switch-container">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={jobTypes.parttime}
                      onChange={() => handleJobTypeToggle("parttime")}
                    />
                    <span className="switch-button"></span> Part Time
                  </label>
                </div>

                <div className="switch-container">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={jobTypes.internship}
                      onChange={() => handleJobTypeToggle("internship")}
                    />
                    <span className="switch-button"></span> Internship
                  </label>
                </div>

                <div className="switch-container">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={jobTypes.temporary}
                      onChange={() => handleJobTypeToggle("temporary")}
                    />
                    <span className="switch-button"></span> Temporary
                  </label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="sidebar-widget">
              <h3>Tags</h3>
              <div className="tags-container">
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
              <div className="clearfix"></div>
            </div>
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

            <div style={{ display: "flex", gap: "5px", flexWrap: "nowrap" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                }}
              >
                Sort by:
              </div>
              <select>
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="random">Random</option>
              </select>
            </div>
          </div>

          <div className="listings-container compact-list-layout margin-top-35">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <a
                  key={job._id}
                  // onClick={() => navigate(`/job/details/${job._id}`)}
                  className="job-listing"
                >
                  <div className="job-listing-details">
                    {/* Logo */}
                    <div className="job-listing-company-logo">
                      <img src={job.companyLogo || companyLogo05} alt="" />
                    </div>

                    {/* Details */}
                    <div className="job-listing-description">
                      <h3 className="job-listing-title">{job.title}</h3>

                      <div className="job-listing-footer">
                        <ul>
                          <li>
                            <i className="icon-material-outline-business"></i>{" "}
                            {job.company}{" "}
                            <div
                              className="verified-badge"
                              title="Verified Employer"
                              data-tippy-placement="top"
                            ></div>
                          </li>
                          <li>
                            <i className="icon-material-outline-location-on"></i>{" "}
                            {job.location}
                          </li>
                          <li>
                            <i className="icon-material-outline-business-center"></i>{" "}
                            {job.type}
                          </li>
                          <li>
                            <i className="icon-material-outline-access-time"></i>{" "}
                            {`${timeDifferenceFromNow(job.createdAt)}`}
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Bookmark */}
                    <span
                      className={bookmarkedJobs ? ' bookmark-icon bookmark-icon-bookmarked' : "bookmark-icon"}
                      onClick={() => {
                        handleUpdateBookmarkedJobs(job._id);
                      }}
                    ></span>
                  </div>
                </a>
              ))
            ) : (
              <p className="no-freelancer" style={{ paddingTop: "3rem" }}>
                No jobs found
              </p>
            )}
          </div>

          {/* Pagination */}
          {filteredJobs.length > 5 && (
            <div className="pagination-container margin-top-60 margin-bottom-60">
              <nav className="pagination">
                <ul>
                  <li className="pagination-arrow">
                    <a href="#">
                      <i className="icon-material-outline-keyboard-arrow-left"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#" className="current-page">
                      2
                    </a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>
                    <a href="#">4</a>
                  </li>
                  <li className="pagination-arrow">
                    <a href="#">
                      <i className="icon-material-outline-keyboard-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsListLayout;
