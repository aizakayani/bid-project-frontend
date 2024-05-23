import { useContext, useState } from "react";
import { addJobAPI, getJobsByUser } from "../services/job";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";

function DashboardPostJob() {
  const { setUserJobs } =
  useContext(UserContext);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full Time");
  const [category, setCategory] = useState("Accounting and Finance");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const handlePostJob = async () => {
    if (title.trim() === "") {
      return;
    }
    if (location.trim() === "") {
      return;
    }

    const jobData = {
      title,
      type,
      category,
      location,
      salary,
      tags,
      description,
      createdAt: Date.now()
    };

    // fetch jobs
    try {
      const jobsResult = await addJobAPI(jobData);
      if (jobsResult?.success) {
        toast.success("Job added successfully");
        setTitle("");
        setType("");
        setLocation("");
        setCategory("");
        setSalary("");
        setTags("")
        setDescription("");
        // fetch jobs
        await getJobs();
      } else {
        toast.error("Failed to add job");
        //hanlde errors :p
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getJobs = async () => {
    // fetch jobs
    try {
      const jobsResult = await getJobsByUser();
      if (jobsResult?.success && jobsResult?.jobs?.length > 0) {
        setUserJobs([...jobsResult?.jobs]);
      }
    } catch (error) {
      console.log(error);
    }
}
  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>Post a Job</h3>

          {/* <!-- Breadcrumbs --> */}
          <nav id="breadcrumbs" class="dark">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>Post a Job</li>
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
                  <i class="icon-feather-folder-plus"></i> Job Submission Form
                </h3>
              </div>

              <div class="content with-padding padding-bottom-10">
                <div class="row">
                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Job Title</h5>
                      <input
                        type="text"
                        class="with-border"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Job Type</h5>
                      <select
                        class="selectpicker with-border"
                        data-size="7"
                        title="Select Job Type"
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option value={"Full Time"}>Full Time</option>
                        <option value={"Freelance"}>Freelance</option>
                        <option value={"Part Time"}>Part Time</option>
                        <option value={"Internship"}>Internship</option>
                        <option value={"Temporary"}>Temporary</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Job Category</h5>
                      <select
                        class="selectpicker with-border"
                        data-size="7"
                        title="Select Category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value={"Accounting and Finance"}>
                          Accounting and Finance
                        </option>
                        <option value={"Clerical & Data Entry"}>
                          Clerical & Data Entry
                        </option>
                        <option value={"Counseling"}>Counseling</option>
                        <option value={"Court Administration"}>
                          Court Administration
                        </option>
                        <option value={"Human Resources"}>
                          Human Resources
                        </option>
                        <option value={"Investigative"}>Investigative</option>
                        <option value={"IT and Computers"}>
                          IT and Computers
                        </option>
                        <option value={"Law Enforcement"}>
                          Law Enforcement
                        </option>
                        <option value={"Management"}>Management</option>
                        <option value={"Miscellaneous"}>Miscellaneous</option>
                        <option value={"Public Relations"}>
                          Public Relations
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Location</h5>
                      <div class="input-with-icon">
                        <div id="autocomplete-container">
                          <input
                            id="autocomplete-input"
                            class="with-border"
                            type="text"
                            placeholder="Type Address"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                          />
                        </div>
                        <i class="icon-material-outline-location-on"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Salary</h5>
                      <div class="row">
                        <div class="col-xl-6">
                          <div class="input-with-icon">
                            <input
                              class="with-border"
                              type="text"
                              onChange={(e) => setSalary(e.target.value)}
                              value={salary}
                            />
                            <i class="currency">USD</i>
                          </div>
                        </div>
                        <div class="col-xl-6">
                          <div class="input-with-icon">
                            <input class="with-border" type="text" />
                            <i class="currency">USD</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>
                        Tags <span>(optional)</span>{" "}
                        <i
                          class="help-icon"
                          data-tippy-placement="right"
                          title="Maximum of 10 tags"
                        ></i>
                      </h5>
                      <div class="keywords-container">
                        <div class="keyword-input-container">
                          <input
                            type="text"
                            class="keyword-input with-border"
                            placeholder="e.g. job title, responsibilites"
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
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
                  </div>

                  <div class="col-xl-12">
                    <div class="submit-field">
                      <h5>Job Description</h5>
                      <textarea
                        cols="30"
                        rows="5"
                        class="with-border"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      ></textarea>
                      <div class="uploadButton margin-top-30">
                        <input
                          class="uploadButton-input"
                          type="file"
                          accept="image/*, application/pdf"
                          id="upload"
                          multiple
                        />
                        <label
                          class="uploadButton-button ripple-effect"
                          for="upload"
                        >
                          Upload Files
                        </label>
                        <span class="uploadButton-file-name">
                          Images or documents that might be helpful in
                          describing your job
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-12">
            <a
              onClick={handlePostJob}
              class="button ripple-effect big margin-top-30"
            >
              <i class="icon-feather-plus"></i> Post a Job
            </a>
          </div>
        </div>
        {/* <!-- Row / End --> */}

        {/* <!-- Footer --> */}
        <div class="dashboard-footer-spacer"></div>
        <div class="small-footer margin-top-15">
          <div class="small-footer-copyrights">
            ©2024 <strong>Bid Bridge</strong>. All Rights Reserved.
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
export default DashboardPostJob;
