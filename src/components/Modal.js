import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
