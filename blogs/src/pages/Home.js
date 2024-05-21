import React from "react";
import useFetch from "../hooks/useFetch";
import "./Home.css";

export default function Home() {
  let { data: blogs, loading, error } = useFetch("http://localhost:3001/blogs");
  return (
    <div className="Home">
      <h1>Home</h1>
      {error && <p>{error}</p>}
      {loading && <p>loading ....</p>}
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id} className="card">
            <h3>{blog.title}</h3>
            <p> posted by - {blog.author}</p>
            <a href="">Read More</a>
          </div>
        ))}
    </div>
  );
}
