import { useContext, useEffect, useState } from "react";
import { addJobAPI, getJobsByUser, updateJobAPI } from "../services/job";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";
import CountriesDropdown from "./CountriesDropdown";
function DashboardPostJob({ updateJobData }) {
  const { setUserJobs } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full Time");
  const [category, setCategory] = useState("Accounting and Finance");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  useEffect(() => {
    if (updateJobData) {
      setTitle(updateJobData.title);
      setType(updateJobData.type);
      setLocation(updateJobData.location);
      setCategory(updateJobData.category);
      setSalary(updateJobData.salary);
      setTags(updateJobData.tags);
      setDescription(updateJobData.description);
    }
  }, [updateJobData]);

  const handlePostJob = async () => {
    if (title.trim() === "") {
      toast.error("Please enter job title to continue");
      return;
    }

    if (selectedCountry.trim() === "") {
      toast.error("Please select location to continue");
      return;
    }

    const jobData = {
      title,
      type,
      category,
      location: selectedCountry,
      salary,
      tags,
      description,
      createdAt: Date.now() / 1000,
    };

    // fetch jobs
    try {
      const jobsResult = updateJobData
        ? await updateJobAPI(jobData, updateJobData._id)
        : await addJobAPI(jobData);
      if (jobsResult?.success) {
        toast.success(
          updateJobData ? "Job updated successfully" : "Job added successfully"
        );
        setTitle("");
        setType("");
        setLocation("");
        setCategory("");
        setSalary("");
        setTags("");
        setDescription("");
        // fetch jobs
        await getJobs();
      } else {
        toast.error(
          updateJobData ? "Failed to update job" : "Failed to add job"
        );
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
  };
  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>{updateJobData ? "Update Job" : "Post a Job"}</h3>
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

                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Location</h5>
                      <div className="input-with-icon">
                        <div id="autocomplete-container">
                          <CountriesDropdown
                            onChange={handleCountryChange}
                            value={selectedCountry}
                          />
                        </div>
                        <i className="icon-material-outline-location-on"></i>
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
              <i class="icon-feather-plus"></i>{" "}
              {updateJobData ? "Update Job" : "Post a Job"}
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
