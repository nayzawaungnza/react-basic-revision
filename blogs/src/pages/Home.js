import React from "react";
import useFetch from "../hooks/useFetch";
import "./Home.css";
import { Link } from "react-router-dom";

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
            <Link to={`blogs/${blog.id}`}>Read More</Link>
          </div>
        ))}
    </div>
  );
}
