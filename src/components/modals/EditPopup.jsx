import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";

const EditPopup = ({ show, handleClose, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {/* <ModalTitle>{'Change Review'}</ModalTitle> */}
      </Modal.Header>
      <Modal.Body>
  


    <div className="popup-tabs-container">

        <div className="popup-tab-content" id="tab1">

            <div className="welcome-text">
                <h3>Change Review</h3>
                <span>Rate <a href="#">Herman Ewout</a> for the project <a href="#">WordPress Theme Installation</a> </span>
            </div>

            <form method="post" id="change-review-form">

                <div className="feedback-yes-no">
                    <strong>Was this delivered on budget?</strong>
                    <div className="radio">
                        <input id="radio-rating-1" name="radio" type="radio" checked/>
                        <label ><span className="radio-label"></span> Yes</label>
                    </div>

                    <div className="radio">
                        <input id="radio-rating-2" name="radio" type="radio"/>
                        <label ><span className="radio-label"></span> No</label>
                    </div>
                </div>

                <div className="feedback-yes-no">
                    <strong>Was this delivered on time?</strong>
                    <div className="radio">
                        <input id="radio-rating-3" name="radio2" type="radio" checked/>
                        <label ><span className="radio-label"></span> Yes</label>
                    </div>

                    <div className="radio">
                        <input id="radio-rating-4" name="radio2" type="radio"/>
                        <label ><span className="radio-label"></span> No</label>
                    </div>
                </div>

                <div className="feedback-yes-no">
                    <strong>Your Rating</strong>
                    <div className="leave-rating">
                        <input type="radio" name="rating" id="rating-1" value="1" checked/>
                        <label  className="icon-material-outline-star"></label>
                        <input type="radio" name="rating" id="rating-2" value="2"/>
                        <label  className="icon-material-outline-star"></label>
                        <input type="radio" name="rating" id="rating-3" value="3"/>
                        <label className="icon-material-outline-star"></label>
                        <input type="radio" name="rating" id="rating-4" value="4"/>
                        <label  className="icon-material-outline-star"></label>
                        <input type="radio" name="rating" id="rating-5" value="5"/>
                        <label  className="icon-material-outline-star"></label>
                    </div><div className="clearfix"></div>
                </div>

                <textarea className="with-border" placeholder="Comment" name="message" id="message"  required>Excellent programmer - helped me fixing small issue.</textarea>

            </form>

            <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style={{marginTop: '20px'}} onClick={handleSubmit}>Save Changes <i className="icon-material-outline-arrow-right-alt"></i></button>

        </div>

    </div>


       
      </Modal.Body>
    </Modal>
  );
};

export default EditPopup;