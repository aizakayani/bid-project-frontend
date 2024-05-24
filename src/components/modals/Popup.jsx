import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Popup = ({
  show,
  title,
  description,
  okButtonText,
  closeButtonText,
  handleOk,
  handleClose,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        {closeButtonText && (
          <Button variant="secondary" onClick={handleClose}>
            {closeButtonText}
          </Button>
        )}
        {okButtonText && (
          <Button variant="primary" onClick={handleOk}>
            {okButtonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
