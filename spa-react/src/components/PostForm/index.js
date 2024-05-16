import React, { useState } from "react";
import "./index.css";
export default function PostForm() {
  let [title, setTitle] = useState("");
  //   let onChangeHandler = (e) => {
  //     setTitle(e.target.value);
  //     console.log(e.target.value);
  //   };
  return (
    <form className="post-form">
      <h1>Create Post</h1>
      <div className="form-control">
        <label>Title</label>
        {/* <input type="text" onChange={onChangeHandler} /> //same under method */}
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <p>{title}</p>
      </div>
      <div className="form-control">
        <button>Create Post</button>
      </div>
    </form>
  );
}
