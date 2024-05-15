import "./App.css";
import image from "./assets/image.png";
import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
function App() {
  let [posts, setPosts] = useState([
    {
      id: 1,
      title: "first post",
    },
    {
      id: 2,
      title: "second post",
    },
    {
      id: 3,
      title: "third post",
    },
  ]);

  return (
    <>
      <Navbar />
      <PostList posts={posts} />
    </>
  );
}

export default App;
