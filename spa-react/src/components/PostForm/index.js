import React, { useRef, useState } from "react";
import "./index.css";
export default function PostForm({ addPost }) {
  let title = useRef();
  let resetForm = () => {
    title.current.value = "";
    console.log("updated success");
  };
  let createPost = (e) => {
    e.preventDefault();
    console.log(title.current.value);
    let post = {
      id: Math.floor(Math.random() * 10000),
      title: title.current.value,
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
        <input type="text" ref={title} />
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
