import { createPortal } from "react-dom";
import { Fragment } from "react";

const Backdrop = (props) => {
    return (
        <div className="backdrop"></div>
    )
};

const ModalOverlay = (props) => {
    return (
       <div className="modal">
        <div className="content">{props.children}</div>
       </div>
    )
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    return (
        <Fragment>
            {createPortal(<Backdrop />, portalElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
};

export default Modal;