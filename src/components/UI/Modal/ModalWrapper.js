import { useEffect, useRef } from "react";
import Portal from "./Portal";

const ModalWrapper = ({ children, onClose, enableOutsideClick }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    document.body.classList.add("backdrop-init");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.classList.remove("backdrop-init");
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickOutside(event) {
    if (
      wrapperRef &&
      !wrapperRef.current.contains(event.target) &&
      !document.body.classList.contains("call-active")
    ) {
      if (enableOutsideClick) {
        onClose();
      }
    }
  }

  return (
    <Portal>
      <div className="modal">
        <div className="modal modal-backdrop">
          <div ref={wrapperRef} className="modal-content">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ModalWrapper;
