import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { timeDifferenceFromNow } from "../utils/utils";
import { useContext, useState } from "react";
function TasksListLayout() {
  const navigate = useNavigate();
  // const tasksList = [
  //   {
  //     title: "Food Delviery Mobile App",
  //     description:
  //       "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster.",
  //     location: "SanFrancissco",
  //     postDate: "2 minutes ago",
  //     tags: ["iOS", "Android", "Mobile App", "Design"],
  //   },
  // ];
  const { tasksList } = useContext(UserContext);
  const [locationInput, setLocationInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const handleButtonClick = (newLocation, newTitle) => {
    setLocationInput(newLocation);
    setTitleInput(newTitle);
  };
  // Function to filter tasks based on location and title
  const filteredTasks = tasksList.filter(task=> {
    // Convert inputs to lowercase for case-insensitive comparison
    const locationMatch = task.location.toLowerCase().includes(locationInput.toLowerCase());
    const titleMatch = task.title.toLowerCase().includes(titleInput.toLowerCase());
    return locationMatch && titleMatch;
  });
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
              <select
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
              </select>
            </div>

            {/* <!-- Keywords --> */}
            <div class="sidebar-widget">
              <h3>Keywords</h3>
              <div class="keywords-container">
                <div class="keyword-input-container">
                  <input
                    id="intro-keywords"
                    placeholder="Task Title or Keywords"
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
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
                  <input type="checkbox" id="tag1" />
                  <label for="tag1">front-end dev</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag2" />
                  <label for="tag2">angular</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag3" />
                  <label for="tag3">react</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag4" />
                  <label for="tag4">vue js</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag5" />
                  <label for="tag5">web apps</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag6" />
                  <label for="tag6">design</label>
                </div>
                <div class="tag">
                  <input type="checkbox" id="tag7" />
                  <label for="tag7">wordpress</label>
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

          <div class="notify-box margin-top-15" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div class="switch-container">
              <label class="switch">
                <input type="checkbox" />
                <span class="switch-button"></span>
                <span class="switch-text">
                  Turn on email alerts for this search
                </span>
              </label>
            </div>

            <div style={{display: 'flex', gap: '5px', flexWrap: 'nowrap'}}>
              <div style={{display: 'flex', flexWrap: 'nowrap'}}>Sort by:</div>
             <select>
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
                <option value='random'>Random</option>
               
      </select>
             </div>
          </div>

          {/* <!-- Tasks Container --> */}
          <div class="tasks-list-container compact-list margin-top-35">
            {/* <!-- Task --> */}
            {filteredTasks?.length > 0 &&
              filteredTasks?.map((task) => {
                return (
                  <a
                    onClick={() => navigate("/task/details")}
                    class="task-listing"
                  >
                    {/* <!-- Job Listing Details --> */}
                    <div class="task-listing-details">
                      {/* <!-- Details --> */}
                      <div class="task-listing-description">
                        <h3 class="task-listing-title">{task.title}</h3>
                        <ul class="task-icons">
                          <li>
                            <i class="icon-material-outline-location-on"></i>{" "}
                            {task.location}
                          </li>
                          <li>
                            <i class="icon-material-outline-access-time"></i>{" "}
                            {`${timeDifferenceFromNow(task?.createdAt)}`}
                          </li>
                        </ul>
                        <p class="task-listing-text">{task.description}</p>
                        <div class="task-tags">
                          {task?.tags?.split(",").length > 0 &&
                            task?.tags
                              ?.split(",")
                              .map((tag) => (
                                <span style={{ marginLeft: 4 }}>{tag}</span>
                              ))}
                        </div>
                      </div>
                    </div>

                    <div class="task-listing-bid">
                      <div class="task-listing-bid-inner">
                        <div class="task-offers">
                          <strong>{task.budget}</strong>
                          <span>{task.type}</span>
                        </div>
                        <span class="button button-sliding-icon ripple-effect">
                          Bid Now{" "}
                          <i class="icon-material-outline-arrow-right-alt"></i>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
          {/* <!-- Tasks Container / End --> */}

          {/* <!-- Pagination --> */}
          <div class="clearfix"></div>
          <div class="row">
            <div class="col-md-12">
              {/* <!-- Pagination --> */} 
              {tasksList?.length > 5 && <div class="pagination-container margin-top-60 margin-bottom-60">
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
              </div>}
              
            </div>
          </div>
          {/* <!-- Pagination / End --> */}
        </div>
      </div>
    </div>
  );
}
export default TasksListLayout;
