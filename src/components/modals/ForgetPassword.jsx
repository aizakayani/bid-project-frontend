import React, { useState } from "react";
import { Modal, ModalTitle } from "react-bootstrap";

const ForgetPassword= ({ show, handleClose, handleSubmit }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <ModalTitle>{"Forget Password"}</ModalTitle>
      </Modal.Header>
      <Modal.Body>
      <form method="post" id="register-account-form">
                <div class="input-with-icon-left">
                  <i class="icon-material-baseline-mail-outline"></i>
                  <input
                    type="text"
                    class="input-text with-border"
                    name="name-register"
                    id="name-register"
                    placeholder="Enter Your User Name"
                    required
                    // value={name}
                  />
                </div>
                <div
                  class="input-with-icon-left"
                  title="Should be at least 8 characters long"
                  data-tippy-placement="bottom"
                >
                  <i class="icon-material-outline-lock"></i>
                  <input
                    type="password"
                    class="input-text with-border"
                    name="password-register"
                    id="password-register"
                    placeholder="New Password"
                    required
                    // value={password}
                  />
                </div>

                <div class="input-with-icon-left">
                  <i class="icon-material-outline-lock"></i>
                  <input
                    type="password"
                    class="input-text with-border"
                    name="password-repeat-register"
                    id="password-repeat-register"
                    placeholder="Repeat Password"
                    required
                    // value={repeatPassword}
                  />
                </div>
                <button
                class="button full-width button-sliding-icon ripple-effect margin-top-10"
                type="submit"
                form="login-form"
                button
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submit" : "Submit"}
              
              </button>
              </form>


      </Modal.Body>
    </Modal>
  );
};

export default ForgetPassword ;
