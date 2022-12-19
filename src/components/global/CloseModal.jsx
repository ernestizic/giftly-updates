import { CloseSquare } from "./SVG";
import React from "react";

const CloseModal = ({ selector, callback }) => {
  const handleClose = () => {
    document.querySelector(selector)?.classList.add("hidden");
    callback?.();
  };

  return (
    <div className="flexRow alignCenter justifyEnd closeModal">
      <button type="button" onClick={handleClose}>
        <CloseSquare />
      </button>
    </div>
  );
};

export default CloseModal;
