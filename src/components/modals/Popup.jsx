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
          <Button variant="secondary" onClick={handleClose} style={{background: '#f4f4f4', color: '#888'}}>
            {closeButtonText}
          </Button>
        )}
        {okButtonText && (
          <Button variant="primary" onClick={handleOk} className='class="button-primary' style={{background: '#770737'}}>
            {okButtonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
