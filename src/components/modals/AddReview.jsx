import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";
const AddReviewPopup = ({ show, handleClose, handleSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <ModalTitle>{"Add review"}</ModalTitle>
      </Modal.Header>
      <Modal.Body>
            <div id="small-dialog-2" class="zoom-anim-dialog mfp-hide dialog-with-tabs">

	     {/* <!--Tabs --> */}
	     <div class="sign-in-form">

		    <ul class="popup-tabs-nav">
		  </ul>

		 <div class="popup-tabs-container">

			{/* <!-- Tab --> */}
			<div class="popup-tab-content" id="tab2">
				
				{/* <!-- Welcome Text --> */}
				<div class="welcome-text">
					<h3>Leave a Review</h3>
					<span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span>
				</div>
					
				{/* <!-- Form --> */}
				<form method="post" id="leave-review-form"/>

					<div class="feedback-yes-no">
						<strong>Was this delivered on budget?</strong>
						<div class="radio">
							<input id="radio-1" name="radio" type="radio" required/>
							<label for="radio-1"><span class="radio-label"></span> Yes</label>
						</div>

						<div class="radio">
							<input id="radio-2" name="radio" type="radio" required/>
							<label for="radio-2"><span class="radio-label"></span> No</label>
						</div>
					</div>

					<div class="feedback-yes-no">
						<strong>Was this delivered on time?</strong>
						<div class="radio">
							<input id="radio-3" name="radio2" type="radio" required/>
							<label for="radio-3"><span class="radio-label"></span> Yes</label>
						</div>

						<div class="radio">
							<input id="radio-4" name="radio2" type="radio" required/>
							<label for="radio-4"><span class="radio-label"></span> No</label>
						</div>
					</div>

					<div class="feedback-yes-no">
						<strong>Your Rating</strong>
						<div class="leave-rating">
							<input type="radio" name="rating" id="rating-radio-1" value="1" required/>
							<label for="rating-radio-1" class="icon-material-outline-star"></label>
							<input type="radio" name="rating" id="rating-radio-2" value="2" required/>
							<label for="rating-radio-2" class="icon-material-outline-star"></label>
							<input type="radio" name="rating" id="rating-radio-3" value="3" required/>
							<label for="rating-radio-3" class="icon-material-outline-star"></label>
							<input type="radio" name="rating" id="rating-radio-4" value="4" required/>
							<label for="rating-radio-4" class="icon-material-outline-star"></label>
							<input type="radio" name="rating" id="rating-radio-5" value="5" required/>
							<label for="rating-radio-5" class="icon-material-outline-star"></label>
						</div>
                        <div class="clearfix"></div>
					</div>

					<textarea class="with-border" placeholder="Comment" name="message2" id="message2" cols="7" required></textarea>

				<form/>
				
				{/* <!-- Button --> */}
				<button class="button full-width button-sliding-icon ripple-effect" type="submit"
                 form="leave-review-form"
                 onClick={handleSubmit}
                 >Leave a Review <i class="icon-material-outline-arrow-right-alt"></i></button>

			</div>

		   </div>
	       </div>
          </div>
      </Modal.Body>
    </Modal>
);
};
export default AddReviewPopup;