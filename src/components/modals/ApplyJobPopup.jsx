import React from "react";
import { Modal } from "react-bootstrap";

const ApplyJobPopup = ({ show, handleClose, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="sign-in-form">
          <div className="popup-tabs-container">
            <div className="popup-tab-content" id="tab">
              <div className="welcome-text">
                <h3>Attach File With CV</h3>
              </div>

              <form method="post" id="apply-now-form" onSubmit={handleSubmit}>
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-account-circle"></i>
                  <input type="text" className="input-text with-border" name="name" id="name" placeholder="First and Last Name" required />
                </div>

                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline"></i>
                  <input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required />
                </div>

                <div className="uploadButton">
                  <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload-cv" />
                  <label className="uploadButton-button ripple-effect" htmlFor="upload-cv">Select File</label>
                  <span className="uploadButton-file-name">Upload your CV / resume relevant file. <br /> Max. file size: 50 MB.</span>
                </div>

                <button className="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit" onClick={handleSubmit}>Apply Now <i className="icon-material-outline-arrow-right-alt"></i></button>
              </form>

            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyJobPopup;
