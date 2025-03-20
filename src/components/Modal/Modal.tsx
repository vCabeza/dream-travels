import React from "react";
import "./Modal.css";
import Button from "../Button/Button";
import Cross from "../../icons/x.png";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headerText?: string;
  headerImage?: string;
};

const Modal = (props: ModalProps) => {
  return props.isOpen ? (
    <dialog className="modal" open={props.isOpen}>
      {props.headerImage && (
        <div className="modal-header-image-container">
          <img
            src={props.headerImage}
            aria-label="header-image"
            className="modal-header-image"
          />
          <Button icon={Cross} onClick={props.onClose} type="black" />
        </div>
      )}
      <div className="modal-container">
        {props.headerText && (
          <div className="modal-header-container">
            <div className="modal-header-text">{props.headerText}</div>
            <Button icon={Cross} onClick={props.onClose} type="black" />
          </div>
        )}
        <div className="modal-body">{props.children}</div>
      </div>
    </dialog>
  ) : (
    <></>
  );
};

export default Modal;
