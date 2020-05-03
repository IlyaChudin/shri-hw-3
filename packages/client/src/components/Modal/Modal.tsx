import React from "react";
import ReactModal from "react-modal";
import cn from "../../classname";

const modal = cn("modal");

ReactModal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
}
const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
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
};

export default Modal;
