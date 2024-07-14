import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const LeavePopup = ({ show, handleClose, handleSubmit, reviewData }) => {
  console.log(reviewData);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (reviewData?.reviewDetails?.rating) {
      setRating(reviewData?.reviewDetails?.rating);
    }
    console.log(reviewData?.reviewDetails);
    if (reviewData?.reviewDetails?.comment) {
      setComment(reviewData?.reviewDetails?.comment);
    }
  }, [reviewData?.reviewDetails]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {/* <ModalTitle>{'Leave a Review'}</ModalTitle> */}
      </Modal.Header>
      <Modal.Body>
        <div class="popup-tabs-container">
          <div class="popup-tab-content" id="tab2">
            <div class="welcome-text">
              <h3>Leave a Review</h3>
              <span>
                Rate <a href="#">{reviewData?.name}</a> for the task{" "}
                <a href="#">{reviewData?.taskTitle}</a>{" "}
              </span>
            </div>

            <form>
              <div class="feedback-yes-no">
                <strong>Your Rating</strong>
                <div class="leave-rating">
                  <input
                    type="radio"
                    name="rating"
                    id="rating-radio-1"
                    value="5"
                    required
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label
                    for="rating-radio-1"
                    class="icon-material-outline-star"
                  ></label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-radio-2"
                    value="4"
                    required
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label
                    for="rating-radio-2"
                    class="icon-material-outline-star"
                  ></label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-radio-3"
                    value="3"
                    required
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label
                    for="rating-radio-3"
                    class="icon-material-outline-star"
                  ></label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-radio-4"
                    value="2"
                    required
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label
                    for="rating-radio-4"
                    class="icon-material-outline-star"
                  ></label>
                  <input
                    type="radio"
                    name="rating"
                    id="rating-radio-5"
                    value="1"
                    required
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label
                    for="rating-radio-5"
                    class="icon-material-outline-star"
                  ></label>
                </div>
                <div class="clearfix"></div>
              </div>

              <textarea
                class="with-border"
                placeholder="Comment"
                name="message2"
                id="message2"
                cols="7"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </form>

            <button
              class="button full-width button-sliding-icon ripple-effect"
              style={{ marginTop: "20px" }}
              onClick={() => {
                if (rating) handleSubmit({ rating, comment });
              }}
            >
              Leave a Review{" "}
              <i class="icon-material-outline-arrow-right-alt"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LeavePopup;
