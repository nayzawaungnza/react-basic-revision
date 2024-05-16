import React, { useState } from "react";
import "./index.css";
export default function PostForm({ addPost }) {
  let [title, setTitle] = useState("");
  let [status, setStatus] = useState("upcomming");
  //   let onChangeHandler = (e) => {
  //     setTitle(e.target.value);
  //     console.log(e.target.value);
  //   };
  let resetForm = () => {
    setTitle("");
    console.log("updated success");
  };
  let createPost = (e) => {
    e.preventDefault();
    let post = {
      id: Math.floor(Math.random() * 10000),
      title: title,
      status: status,
    };
    resetForm();
    addPost(post);
  };
  return (
    <form className="post-form" onSubmit={createPost}>
      <h1>Create Post {status}</h1>
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="form-control">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="dropped">Dropped</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcomming">Upcomming</option>
        </select>
      </div>
      <div className="form-control">
        <button type="button" onClick={resetForm}>
          reset
        </button>
        <button type="submit">Create Post</button>
      </div>
    </form>
  );
}
