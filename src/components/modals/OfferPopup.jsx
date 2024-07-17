import React, { useState } from "react";
import { Modal, ModalTitle } from "react-bootstrap";

const MakeOffer = ({ show, handleClose, handleSubmit }) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <ModalTitle>{"Make an Offer"}</ModalTitle>
      </Modal.Header>
      <Modal.Body>
          <div class="popup-tabs-container">
        <div class="popup-tab-content" id="tab">
            <div class="welcome-text">
                <h3>Discuss your project with David</h3>
            </div>
            <form method="post">
                <div class="input-with-icon-left">
                    <i class="icon-material-outline-account-circle"></i>
                    <input type="text" class="input-text with-border" name="name" id="name" placeholder="First and Last Name"/>
                </div>
                <div class="input-with-icon-left">
                    <i class="icon-material-baseline-mail-outline"></i>
                    <input type="text" class="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address"/>
                </div>
                <textarea name="textarea" cols="10" placeholder="Message" class="with-border"></textarea>
                <div class="uploadButton margin-top-25">
                    <input class="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple/>
                    <label class="uploadButton-button ripple-effect" for="upload">Add Attachments</label>
                    <span class="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br/> Max. files size: 50 MB.</span>
                </div>
            </form>
            <button class="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit"onClick={handleSubmit}>Make an Offer <i class="icon-material-outline-arrow-right-alt"></i></button>
        </div>

    </div>


      </Modal.Body>
    </Modal>
  );
};

export default MakeOffer;
