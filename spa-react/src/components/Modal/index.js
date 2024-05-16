import React from "react";
import "./index.css";
import ReactDom from "react-dom";

export default function Modal({ children }) {
  return ReactDom.createPortal(
    <div className="modal-component">
      <div className="modal-backdrop">
      <div className="modal">{children}</div>
    </div>
    </div>,
    document.getElementById("modal")
  );
}
