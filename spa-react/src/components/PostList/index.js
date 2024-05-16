import React from "react";
import "./index.css";
import styles from "./single_post.module.css";

export default function PostList({ posts }) {
  return (
    <div className="postList container">
      {posts.map((post) => (
        <div key={post.id} className={`single-post ${styles.card}`}>
          <h4>{post.title}</h4>
          <h6>{post.status}</h6>
        </div>
      ))}
    </div>
  );
}
