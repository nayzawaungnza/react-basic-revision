import React, { useState } from "react";
import "./index.css";
export default function PostForm({ addPost }) {
  let [title, setTitle] = useState("");
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
    };
    resetForm();
    addPost(post);
  };
  return (
    <form className="post-form" onSubmit={createPost}>
      <h1>Create Post</h1>
      <div className="form-control">
        <label>Title</label>
        {/* <input type="text" onChange={onChangeHandler} /> //same under method */}
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p>{title}</p>
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
