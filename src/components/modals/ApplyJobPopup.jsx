import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../context/userContext";

const ApplyJobPopup = ({ show, handleClose, handleSubmit }) => {
  const { user } = useContext(UserContext);
  const [applicantCV, setApplicantCV] = useState(null);
  const [applicantName, setApplicantName] = useState(user?.name || "");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "");
  console.log(applicantCV);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="sign-in-form">
          <div className="popup-tabs-container">
            <div className="popup-tab-content" id="tab">
              <div className="welcome-text">
                <h3>Attach File With CV</h3>
              </div>

              <form method="post" id="apply-now-form">
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-account-circle"></i>
                  <input
                    type="text"
                    className="input-text with-border"
                    name="name"
                    id="name"
                    placeholder="First and Last Name"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </div>

                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline"></i>
                  <input
                    type="text"
                    className="input-text with-border"
                    name="emailaddress"
                    id="emailaddress"
                    placeholder="Email Address"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                  />
                </div>

                <div className="uploadButton">
                  <input
                    className="uploadButton-input"
                    type="file"
                    accept="application/pdf"
                    id="upload-cv"
                    onChange={(e) => {
                      console.log("LALALALALAL", e.target.files[0]);
                      setApplicantCV(e.target.files[0]);
                    }}
                  />
                  <label
                    className="uploadButton-button ripple-effect"
                    htmlFor="upload-cv"
                  >
                    Select File
                  </label>
                  {!applicantCV && (
                    <span className="uploadButton-file-name">
                      Upload your CV / resume relevant file. <br /> Max. file
                      size: 50 MB.
                    </span>
                  )}
                  {applicantCV && (
                    <span className="uploadButton-file-name">
                      {applicantCV.name}
                    </span>
                  )}
                </div>

                <button
                  className="button margin-top-35 full-width button-sliding-icon ripple-effect"
                  type="submit"
                  onClick={() => {
                    handleSubmit(applicantCV, applicantName, applicantEmail);
                    handleClose();
                  }}
                >
                  Apply Now{" "}
                  <i className="icon-material-outline-arrow-right-alt"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyJobPopup;
