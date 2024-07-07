import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { timeDifferenceFromNow } from "../utils/utils";
import { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";

function TasksListLayout() {
  const navigate = useNavigate();
  const { tasksList, setUser } = useContext(UserContext);
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

  const [locationInput, setLocationInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [tags, setTags] = useState([]);

  // Handle category selection
  const handleSelect = (category) => {
    setSelectedCategory(category);
  };

  // Add a new tag from the title input
  const handleAddTag = () => {
    const newTag = titleInput.trim().toLowerCase();
    if (newTag === "") return;

    const id = newTag.replace(/\s+/g, "-");
    if (!tags.some((tag) => tag.id === id)) {
      setTags([...tags, { id, name: newTag, checked: false }]);
      setTitleInput("");
    }
  };

  // Toggle the checked state of a tag
  const handleCheckboxChange = (id) => {
    setTags(
      tags.map((tag) =>
        tag.id === id ? { ...tag, checked: !tag.checked } : tag
      )
    );
  };

  // Filter tasks based on location, tags, and category
  const filteredTasks = tasksList.filter((task) => {
    const locationMatch =
      locationInput.trim() === "" ||
      task?.location?.toLowerCase().includes(locationInput.toLowerCase());
    console.log({ locationMatch });
    console.log("location", task.location.toLowerCase());
    console.log("inputlocation", locationInput.toLowerCase());
    // const selectedTags = tags.filter(tag => tag.checked).map(tag => tag.id);
    // const tagsMatch = selectedTags.length === 0 ||
    //   selectedTags.some(tag => task?.requiredSkills
    //     ?.toLowerCase().includes(tag));

    const categoryMatch =
      selectedCategory.trim() === "All categories" ||
      task?.category?.toLowerCase().includes(selectedCategory.toLowerCase());
    console.log({ categoryMatch });

    return locationMatch && categoryMatch;
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

            {/* Keywords */}
            <div className="sidebar-widget">
              <h3>Keywords</h3>
              <div className="keywords-container">
                <div className="keyword-input-container">
                  <input
                    id="intro-keywords"
                    placeholder="Task Title or Keywords"
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
                <div class="sidebar-widget"></div>
                <div class="tags-container" style={{ marginTop: "20px" }}>
                  {tags.map((tag) => (
                    <div key={tag.id} className="tag">
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

          {/* Tasks Container */}
          <div className="tasks-list-container compact-list margin-top-35">
            {filteredTasks?.length > 0 ? (
              filteredTasks?.map((task) => {
                return (
                  <a
                    onClick={() => navigate(`/task/details/${task._id}`)}
                    className="task-listing"
                  >
                    {/* Task Listing Details */}
                    <div className="task-listing-details">
                      {/* Details */}
                      <div className="task-listing-description">
                        <h3 className="task-listing-title">{task.title}</h3>
                        <ul className="task-icons">
                          <li>
                            <i className="icon-material-outline-location-on"></i>{" "}
                            {task.location}
                          </li>
                          <li>
                            <i className="icon-material-outline-access-time"></i>{" "}
                            {`${timeDifferenceFromNow(task?.createdAt)}`}
                          </li>
                        </ul>
                        <p className="task-listing-text">{task.description}</p>
                        <div className="task-tags">
                          {task?.tags?.split(",").length > 0 &&
                            task?.tags?.split(",").map((tag, index) => (
                              <span key={index} style={{ marginLeft: 4 }}>
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="task-listing-bid">
                      <div className="task-listing-bid-inner">
                        <div className="task-offers">
                          <strong>{task.budget}</strong>
                          <span>{task.type}</span>
                        </div>
                        <span className="button button-sliding-icon ripple-effect">
                          Bid Now{" "}
                          <i className="icon-material-outline-arrow-right-alt"></i>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <p className="no-freelancer" style={{ paddingTop: "3rem" }}>
                No Tasks found
              </p>
            )}
          </div>
          {/* Tasks Container / End */}

          {/* Pagination */}
          <div className="clearfix"></div>
          {/* <div className="row">
            <div className="col-md-12">
              
              {tasksList?.length > 5 && (
                <div className="pagination-container margin-top-60 margin-bottom-60">
                  <nav className="pagination">
                    <ul>
                      <li className="pagination-arrow">
                        <a href="#" className="ripple-effect">
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
          </div> */}
          {/* <!-- Pagination / End --> */}
        </div>
      </div>
    </div>
  );
}
export default TasksListLayout;
