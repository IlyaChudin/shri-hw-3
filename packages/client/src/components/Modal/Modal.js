import React from "react";
import ReactModal from "react-modal";
import cn from "../../classname";

ReactModal.setAppElement("#root");

function Modal(props) {
  const { isOpen, children } = props;

  const modal = cn("modal");
  return (
    <ReactModal
      isOpen={isOpen}
      portalClassName={modal()}
      className={modal("content")}
      overlayClassName={modal("overlay")}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
