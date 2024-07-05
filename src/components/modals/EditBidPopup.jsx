import React, { useState } from "react";
import { Modal, ModalTitle } from "react-bootstrap";

const EditBidPopup = ({ show, handleClose, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <ModalTitle>{'Edit Bid'}</ModalTitle>
      </Modal.Header>
      <Modal.Body>

        <div class="popup-tabs-container">
          <div class="popup-tab-content" id="tab">
            <div class="bidding-widget">
              <span class="bidding-detail">
                Set your <strong>minimal hourly rate</strong>
              </span>
              <div style={{display: 'flex', gap: '5px', marginTop: 
            '10px'}}>
                <div class="bidding-value">
                  $<span id="biddingVal"></span>
                </div>
                <input
                  class="bidding-slider"
                  type="text"
                  value=""
                  data-slider-handle="custom"
                  data-slider-currency="$"
                  data-slider-min="10"
                  data-slider-max="60"
                  data-slider-value="40"
                  data-slider-step="1"
                  data-slider-tooltip="hide"
                />
              </div>

              <span class="bidding-detail margin-top-30">
                Set your <strong>delivery time</strong>
              </span>

              <div class="bidding-fields">
                <div class="bidding-field">
                  <div class="qtyButtons with-border">
                    <div class="qtyDec"></div>
                    <input type="text" name="qtyInput" value="2" />
                    <div class="qtyInc"></div>
                  </div>
                </div>
                <div class="bidding-field">
                  <select class="selectpicker default with-border">
                    <option selected>Days</option>
                    <option>Hours</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              class="button full-width button-sliding-icon ripple-effect"
              type="submit"
              onClick={handleSubmit}
              style={{marginTop: '25px'}}
            >
              Save Changes <i class="icon-material-outline-arrow-right-alt"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditBidPopup;
