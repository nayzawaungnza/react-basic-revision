import React from "react";
import "./index.css";
import ReactDom from "react-dom";

export default function Modal({ children, danger = false }) {
  return ReactDom.createPortal(
    <div className="modal-component">
      <div className="modal-backdrop">
        <div
          className="modal"
          style={{
            border: "4px solid",
            borderColor: danger ? "red" : "blue",
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
