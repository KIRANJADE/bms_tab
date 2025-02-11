import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationPopup = ({ show, title, message, onConfirm, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirm Action"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "Are you sure you want to proceed?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopup;
