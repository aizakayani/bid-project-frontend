import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  getUserDetailsAPI,
  removeUserCoverAPI,
  removeUserResumeAPI,
  updateUserAPI,
  updateUserAvatarAPI,
  updateUserCoverAPI,
  updateUserResumeAPI,
} from "../services/user";
import toast from "react-hot-toast";
import { countries } from "../utils/common";

function DashboardSettings() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("images/user-avatar-placeholder.png");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [coverLetter, setCoverLetter] = useState(null);
  const [resume, setResume] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [description, setDescription] = useState("");
  
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    // fetch user details
    try {
      const userDetails = await getUserDetailsAPI();
      if (userDetails?.user) {
        setUser(userDetails?.user);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      user?.name && setName(user.name);
      user?.email && setEmail(user.email);
      user?.role && setRole(user.role);
      user?.avatar?.contentType &&
        user?.avatar?.base64Image &&
        setAvatar(
          `data:${user?.avatar?.contentType};base64,${user?.avatar?.base64Image}`
        );
      user?.data?.location && setLocation(user?.data?.location);
      user?.data?.hourlyRate && setHourlyRate(user?.data?.hourlyRate);
      user?.data?.skills && setSkills(user?.data?.skills?.split(","));
      user?.data?.introduction && setIntroduction(user?.data?.introduction);
      user?.coverLetter && setCoverLetter(user?.coverLetter);
      user?.resume && setResume(user?.resume);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    console.log(name, email, location, role, hourlyRate, skills, introduction);
    if (name.trim() === "") {
      toast.error("Please enter name");
    }
    if (email.trim() === "") {
      toast.error("Please enter email");
    }
    const payload = {
      name: name.trim(),
      email: email.trim(),
      role,
      data: {
        introduction: introduction.trim(),
      },
    };
    if (location && location !== "") {
      payload.data.location = location;
    }
    if (hourlyRate) {
      payload.data.hourlyRate = hourlyRate;
    }
    if (skills?.length > 0) {
      payload.data.skills = skills.join(",");
    }
    if (skills?.length > 0) {
      payload.data.skills = skills.join(",");
    }

    let passwordError = false;
    if (newPassword?.trim !== "") {
      if (currentPassword !== user?.password) {
        toast.error("Please enter correct current password to continue");
        passwordError = true;
      }
      if (newPassword.trim() !== repeatPassword.trim()) {
        toast.error("Please enter correct repeat password to continue");
        passwordError = true;
      }
      payload.password = newPassword;
    }

    if (passwordError) return;

    try {
      const response = await updateUserAPI(payload);
      if (response?.success) {
        toast.success("User details updated successfully");
        localStorage.setItem("token", response?.updatedToken);
        setUser(response?.user);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload cover letter");
    }
  };

  const handleRemoveCoverLetter = async () => {
    try {
      const response = await removeUserCoverAPI();
      if (response?.success) {
        toast.success("Cover letter removed successfully");
        setCoverLetter(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to remove cover letter");
    }
  };

  const handleRemoveResume = async () => {
    try {
      const response = await removeUserResumeAPI();
      if (response?.success) {
        toast.success("Resume removed successfully");
        setResume(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to remove resume");
    }
  };

  const handleSetSkillEnter = () => {
    if (skills?.length > 9) {
      toast.error("Skills limit reached!");
      return;
    }
    if (skill?.trim() !== "") {
      const skillsCopy = [...skills];
      skillsCopy.push(skill?.trim());
      setSkills([...skillsCopy]);
      setSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const skillsCopy = [...skills];
    skillsCopy.splice(index, 1);
    setSkills([...skillsCopy]);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);

    try {
      const response = await updateUserAvatarAPI(formData);
      if (response?.success && response?.user?.avatar) {
        setAvatar(
          `data:${response?.user?.avatar?.contentType};base64,${response?.user?.avatar?.base64Image}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload avatar");
    }
  };

  const handleCoverFileChange = async (event) => {
    const formData = new FormData();
    formData.append("cover", event.target.files[0]);

    try {
      const response = await updateUserCoverAPI(formData);
      if (response?.success) {
        toast.success("Cover letter uploaded successfully");
        setCoverLetter(response?.coverLetter);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload cover letter");
    }
  };

  const handleResumeFileChange = async (event) => {
    const formData = new FormData();
    formData.append("resume", event.target.files[0]);

    try {
      const response = await updateUserResumeAPI(formData);
      if (response?.success) {
        toast.success("Resume uploaded successfully");
        setResume(response?.resume);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload resume");
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCoverClick = () => {
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleResumeClick = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.click();
    }
  };

  return (
    <div class="dashboard-content-container" data-simplebar>
      <div class="dashboard-content-inner">
        {/* <!-- Dashboard Headline --> */}
        <div class="dashboard-headline">
          <h3>Settings</h3>user
        </div>

        {/* <!-- Row --> */}
        <div class="row">
          {/* <!-- Dashboard Box --> */}
          <div class="col-xl-12">
            <div class="dashboard-box margin-top-0">
              {/* <!-- Headline --> */}
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-account-circle"></i> My
                  Account
                </h3>
              </div>

              <div class="content with-padding padding-bottom-0">
                <div class="row">
                  <div class="col-auto">
                    <div
                      class="avatar-wrapper"
                      data-tippy-placement="bottom"
                      title="Change Avatar"
                      onClick={handleAvatarClick}
                    >
                      <img class="profile-pic" src={avatar} alt="" />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ visibility: "hidden" }}
                        accept="image/*"
                      />
                      <div class="upload-button"></div>
                      <input class="file-upload" type="file" accept="image/*" />
                    </div>
                  </div>

                  <div class="col">
                    <div class="row">
                      <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Name</h5>
                          <input
                            type="text"
                            class="with-border"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Last Name</h5>
                          <input
                            type="text"
                            class="with-border"
                            value="Smith"
                          />
                        </div>
                      </div> */}

                      <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Email</h5>
                          <input
                            type="text"
                            class="with-border"
                            placeholder="tom@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="col-xl-6">
                        {/* <!-- Account Type --> */}
                        <div class="submit-field">
                          <h5>Account Type</h5>
                          <div class="account-type">
                            <div>
                              <input
                                type="radio"
                                name="account-type-radio"
                                id="freelancer-radio"
                                class="account-type-radio"
                                checked={role === "freelancer"}
                                onClick={(e) => {
                                  if (e.target.checked) setRole("freelancer");
                                }}
                              />
                              <label
                                for="freelancer-radio"
                                class="ripple-effect-dark"
                              >
                                <i class="icon-material-outline-account-circle"></i>{" "}
                                Freelancer
                              </label>
                            </div>

                            <div>
                              <input
                                type="radio"
                                name="account-type-radio"
                                id="employer-radio"
                                class="account-type-radio"
                                checked={role === "employer"}
                                onClick={(e) => {
                                  if (e.target.checked) setRole("employer");
                                }}
                              />
                              <label
                                for="employer-radio"
                                class="ripple-effect-dark"
                              >
                                <i class="icon-material-outline-business-center"></i>{" "}
                                Employer
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                
                      <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Location</h5>
                          <select
                            class="selectpicker with-border"
                            data-size="7"
                            title="Select Job Type"
                            data-live-search="true"
                            value={location || ""}
                            onChange={(e) => {
                              setLocation(e.target.value);
                            }}
                          >
                            <option value={""}>{"Please select"}</option>
                            {countries.map((country) => {
                              return <option value={country}>{country}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Dashboard Box --> */}
          {role === "employer" && (
           <div class="col-xl-12">
            <div class="dashboard-box margin-top-0">
              {/* <!-- Headline --> */}
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-account-circle"></i> Comapny Details
                </h3>
              </div>

              <div class="content with-padding padding-bottom-0">
                <div class="row">
                  <div class="col-auto">
                    <div
                      class="avatar-wrapper"
                      data-tippy-placement="bottom"
                      title="Change Avatar"
                      onClick={handleAvatarClick}
                    >
                      <img class="profile-pic" src={avatar} alt="" />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ visibility: "hidden" }}
                        accept="image/*"
                      />
                      <div class="upload-button"></div>
                      <input class="file-upload" type="file" accept="image/*" />
                    </div>
                    <h5>Company Logo</h5>
                  </div>

                  <div class="col">
                    <div class="row">
                      <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Company Name</h5>
                          <input
                            type="text"
                            class="with-border"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Last Name</h5>
                          <input
                            type="text"
                            class="with-border"
                            value="Smith"
                          />
                        </div>
                      </div> */}

                      <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Company Email</h5>
                          <input
                            type="text"
                            class="with-border"
                            placeholder="tom@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6">
                        <div class="submit-field">
                      
                          <h5>Description</h5>
                          <textarea
                          cols="30"
                          rows="5"
                          class="with-border"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                        ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           )}


          {/* <!-- Dashboard Box --> */}
          {role === "freelancer" && (
            <div class="col-xl-12">
              <div class="dashboard-box">
                {/* <!-- Headline --> */}
                <div class="headline">
                  <h3>
                    <i class="icon-material-outline-face"></i> My Profile
                  </h3>
                </div>

                <div class="content">
                  <ul class="fields-ul">
                    <li>
                      <div class="row">
                        <div class="col-xl-4">
                          <div class="submit-field">
                            <div class="bidding-widget">
                              {/* <!-- Headline --> */}
                              <span class="bidding-detail">
                                Set your <strong>minimal hourly rate</strong>
                              </span>

                              {/* <!-- Slider --> */}
                              <div class="bidding-value margin-bottom-10">
                                $<span id="biddingVal"></span>
                              </div>
                              <input
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                min="5"
                                max="150"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Category</h5>
                      <select
                        class="selectpicker with-border"
                        data-size="7"
                        title="Select Category"
                        // onChange={(e) => {
                        //   setCategory(e.target.value);
                        // }}
                      >
                        <option value={"Admin Support"}>Admin Support</option>
                        <option value={"Customer Service"}>
                          Customer Service
                        </option>
                        <option value={"Data Analytics"}>Data Analytics</option>
                        <option value={"Design & Creative"}>
                          Design & Creative
                        </option>
                        <option value={"Legal"}>Legal</option>
                        <option value={"Software Developing"}>
                          Software Developing
                        </option>
                        <option value={"IT & Networking"}>
                          IT & Networking
                        </option>
                        <option value={"Writing"}>Writing</option>
                        <option value={"Translation"}>Translation</option>
                        <option value={"Sales & Marketing"}>
                          Sales & Marketing
                        </option>
                      </select>
                    </div>
                  </div>
                        <div class="col-xl-4">
                          <div class="submit-field">
                            <h5>
                              Skills{" "}
                              <i
                                class="help-icon"
                                data-tippy-placement="right"
                                title="Add up to 10 skills"
                              ></i>
                            </h5>

                            {/* <!-- Skills List --> */}
                            <div class="keywords-container">
                              <div class="keyword-input-container">
                                <input
                                  type="text"
                                  class="keyword-input with-border"
                                  placeholder="e.g. Angular, Laravel"
                                  value={skill}
                                  onChange={(e) => setSkill(e.target.value)}
                                />
                                <button
                                  class="keyword-input-button ripple-effect"
                                  onClick={handleSetSkillEnter}
                                >
                                  <i class="icon-material-outline-add"></i>
                                </button>
                              </div>
                              <div class="keywords-list">
                                {skills?.length > 0 &&
                                  skills.map((skill, index) => {
                                    return (
                                      <span class="keyword">
                                        <span
                                          class="keyword-remove"
                                          onClick={() =>
                                            handleRemoveSkill(index)
                                          }
                                        ></span>
                                        <span class="keyword-text">
                                          {skill}
                                        </span>
                                      </span>
                                    );
                                  })}
                                {/* <span class="keyword">
                                <span class="keyword-remove"></span>
                                <span class="keyword-text">Vue JS</span>
                              </span>
                              <span class="keyword">
                                <span class="keyword-remove"></span>
                                <span class="keyword-text">iOS</span>
                              </span>
                              <span class="keyword">
                                <span class="keyword-remove"></span>
                                <span class="keyword-text">Android</span>
                              </span>
                              <span class="keyword">
                                <span class="keyword-remove"></span>
                                <span class="keyword-text">Laravel</span>
                              </span> */}
                              </div>
                              <div class="clearfix"></div>
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-4">
                          <div class="submit-field">
                            <h5>Attachments</h5>

                            {/* <!-- Attachments --> */}
                            <div class="attachments-container margin-top-0 margin-bottom-0">
                              <div
                                class="attachment-box ripple-effect"
                                onClick={handleCoverClick}
                              >
                                <span>Cover Letter</span>
                                {coverLetter && (
                                  <span>{coverLetter.filename}</span>
                                )}
                                <i>PDF</i>
                                <button
                                  class="remove-attachment"
                                  data-tippy-placement="top"
                                  title="Remove"
                                  onClick={handleRemoveCoverLetter}
                                ></button>
                                <input
                                  ref={coverInputRef}
                                  type="file"
                                  accept="application/pdf"
                                  id="upload"
                                  style={{ visibility: "hidden" }}
                                  onChange={handleCoverFileChange}
                                />
                              </div>
                              <div
                                class="attachment-box ripple-effect"
                                onClick={handleResumeClick}
                              >
                                <span>Resume</span>
                                {resume && <span>{resume.filename}</span>}
                                <i>PDF</i>
                                <button
                                  class="remove-attachment"
                                  data-tippy-placement="top"
                                  title="Remove"
                                  onClick={handleRemoveResume}
                                ></button>
                                <input
                                  ref={resumeInputRef}
                                  type="file"
                                  accept="application/pdf"
                                  id="upload"
                                  style={{ visibility: "hidden" }}
                                  onChange={handleResumeFileChange}
                                />
                              </div>
                            </div>
                            <div class="clearfix"></div>

                            {/* <!-- Upload Button --> */}
                            <div class="uploadButton margin-top-0">
                              {/* <input
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
                            </label> */}
                              <span class="uploadButton-file-name">
                                Maximum file size: 10 MB
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        {/* <div class="col-xl-6">
                        <div class="submit-field">
                          <h5>Tagline</h5>
                          <input
                            type="text"
                            class="with-border"
                            value="iOS Expert + Node Dev"
                          />
                        </div>
                      </div> */}

                        <div class="col-xl-12">
                          <div class="submit-field">
                            <h5>Introduce Yourself</h5>
                            <textarea
                              cols="30"
                              rows="5"
                              class="with-border"
                              onChange={(e) => setIntroduction(e.target.value)}
                              value={introduction}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* <!-- Dashboard Box --> */}
          <div class="col-xl-12">
            <div id="test1" class="dashboard-box">
              {/* <!-- Headline --> */}
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-lock"></i> Password & Security
                </h3>
              </div>

              <div class="content with-padding">
                <div class="row">
                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Current Password</h5>
                      <input
                        type="password"
                        class="with-border"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>New Password</h5>
                      <input
                        type="password"
                        class="with-border"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="col-xl-4">
                    <div class="submit-field">
                      <h5>Repeat New Password</h5>
                      <input
                        type="password"
                        class="with-border"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div class="col-xl-12">
                    <div class="checkbox">
                      <input type="checkbox" id="two-step" checked />
                      <label for="two-step">
                        <span class="checkbox-icon"></span> Enable Two-Step
                        Verification via Email
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Button --> */}
          <div class="col-xl-12">
            <a
              href="#"
              class="button ripple-effect big margin-top-30"
              onClick={handleSaveChanges}
            >
              Save Changes
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
export default DashboardSettings;
