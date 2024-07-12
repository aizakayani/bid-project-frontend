import React, { useState } from "react";
import { Modal, ModalTitle } from "react-bootstrap";

const AddNotePopup = ({ show, handleClose, handleSubmit }) => {
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Low");
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
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={"Low"}>Low Priority</option>
                <option value={"Medium"}>Medium Priority</option>
                <option value={"High"}>High Priority</option>
              </select>

              <textarea
                name="textarea"
                placeholder="Note"
                className="with-border"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </form>
            <button
              className="button full-width button-sliding-icon ripple-effect"
              style={{ marginTop: "20px" }}
              type="submit"
              form="add-note"
              onClick={() => {
                console.log("huiiiii");
                handleSubmit({
                  content,
                  priority,
                });
              }}
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
