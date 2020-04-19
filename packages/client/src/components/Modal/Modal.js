import React from "react";
import ReactModal from "react-modal";
import cn from "../../classname";

const modal = cn("modal");

function Modal(props) {
  const { isOpen, children } = props;
  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.querySelector("#root")}
      portalClassName={modal()}
      className={modal("content")}
      overlayClassName={modal("overlay")}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
