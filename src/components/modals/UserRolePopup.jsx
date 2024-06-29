import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const UserRolePopup = ({ handleSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState("freelancer");
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>{"Please select role to continue"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="account-type">
          <div>
            <input
              type="radio"
              name="account-type-radio"
              id="freelancer-radio"
              class="account-type-radio"
              checked={selectedRole === "freelancer"}
              onClick={(e) => {
                if (e.target.checked) setSelectedRole("freelancer");
              }}
            />
            <label for="freelancer-radio" class="ripple-effect-dark">
              <i class="icon-material-outline-account-circle"></i> Freelancer
            </label>
          </div>

          <div>
            <input
              type="radio"
              name="account-type-radio"
              id="employer-radio"
              class="account-type-radio"
              checked={selectedRole === "employer"}
              onClick={(e) => {
                if (e.target.checked) setSelectedRole("employer");
              }}
            />
            <label for="employer-radio" class="ripple-effect-dark">
              <i class="icon-material-outline-business-center"></i> Employer
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => handleSelectRole(selectedRole)}
        >
          {"Select"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRolePopup;
