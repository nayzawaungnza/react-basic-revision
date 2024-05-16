import React from "react";
import "./index.css";
import ReactDom from "react-dom";

export default function Modal({ children, setshowModal, danger = false }) {
  let borderClass = danger ? "border-red" : "border-blue";
  return ReactDom.createPortal(
    <div className="modal-component">
      <div className="modal-backdrop">
        <div className={`modal ${borderClass}`}>
          {children}
          <button onClick={() => setshowModal(false)}>close</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
