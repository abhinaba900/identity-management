import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function CustomToast({ show, onClose, message }) {
  return (
    <ToastContainer
      position="bottom-center"
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;
