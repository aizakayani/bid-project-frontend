import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";

const AddNotePopup = ({ show, handleClose, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <ModalTitle>{"Add Note"}</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <div className="popup-tabs-container">
          <div className="popup-tab-content" id="tab">
            <div className="welcome-text">
              <h3>Do Not Forget 😎</h3>
            </div>
            <form method="post" id="add-note">
              <select
                className="selectpicker with-border default margin-bottom-20"
                data-size="7"
                title="Priority"
              >
                <option>Low Priority</option>
                <option>Medium Priority</option>
                <option>High Priority</option>
              </select>

              <textarea
                name="textarea"
                placeholder="Note"
                className="with-border"
              ></textarea>
            </form>
            <button
              className="button full-width button-sliding-icon ripple-effect"
              style={{marginTop: '20px'}}
              type="submit"
              form="add-note"
              onClick={handleSubmit}
            >
              Add Note <i className="icon-material-outline-arrow-right-alt"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNotePopup;
