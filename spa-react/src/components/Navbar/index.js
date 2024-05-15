import React from "react";
import "./index.css";
export default function Navbar({ setshowModal }) {
  return (
    <nav>
      <div className="container">
        <h1>Logo</h1>
        <ul>
          <li>Home</li>
          <li>Posts</li>
          <li onClick={() => setshowModal(true)}>Sign In</li>
        </ul>
      </div>
    </nav>
  );
}
