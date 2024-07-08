import React, { useState } from "react";
import { Modal, ModalTitle } from "react-bootstrap";

const EditBidPopup = ({ show, handleClose, handleSubmit, editBidData }) => {
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(
    editBidData?.deliveryTime
  );
  const [bidRate, setBidRate] = useState(editBidData?.bidRate);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <ModalTitle>{"Edit Bid"}</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <div class="popup-tabs-container">
          <div class="popup-tab-content" id="tab">
            <div class="bidding-widget">
              <span class="bidding-detail">
                Set your <strong>minimal hourly rate</strong>
              </span>
              <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
                <div class="bidding-value">
                  $<span id="biddingVal"></span>
                </div>
                <input
                  class="bidding-slider"
                  type="text"
                  data-slider-handle="custom"
                  data-slider-currency="$"
                  data-slider-min="10"
                  data-slider-max="60"
                  data-slider-value="40"
                  data-slider-step="1"
                  data-slider-tooltip="hide"
                  onChange={(e) => setBidRate(e.target.value)}
                  value={bidRate}
                />
              </div>

              <span class="bidding-detail margin-top-30">
                Set your <strong>delivery time</strong>
              </span>

              <div class="bidding-fields">
                {/* <div class="bidding-field">
                  <div class="qtyButtons with-border">
                    <div class="qtyDec"></div>
                    <input type="text" name="qtyInput" value="2" />
                    <div class="qtyInc"></div>
                  </div>
                </div> */}
                <div class="bidding-field">
                  <select
                    class="selectpicker default with-border"
                    value={selectedDeliveryTime}
                    onChange={(e) => {
                      setSelectedDeliveryTime(e.target.value);
                    }}
                  >
                    <option value={"less-three"}>{"Less than 3 months"}</option>
                    <option value={"three-to-six"}>{"3 to 6 months"}</option>
                    <option value={"more-six"}>{"More than 6 months"}</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              class="button full-width button-sliding-icon ripple-effect"
              type="submit"
              onClick={() =>
                handleSubmit({ bidRate, deliveryTime: selectedDeliveryTime })
              }
              style={
                editBidData?.bidRate === bidRate &&
                editBidData.deliveryTime === selectedDeliveryTime
                  ? {
                      pointerEvents: "none",
                      cursor: "default",
                      marginTop: "25px",
                    }
                  : { marginTop: "25px" }
              }
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
