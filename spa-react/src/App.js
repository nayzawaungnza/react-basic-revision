import "./App.css";
import image from "./assets/image.png";
import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Modal from "./components/Modal";
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
      {/* <Modal>
        <h1>Zoom class is available now.</h1>
        <p>
          feel free to <a>join</a> here.
        </p>
      </Modal> */}
      <Modal>
        <h1>Term and Condition</h1>
        <p>loerm</p>
      </Modal>
    </>
  );
}

export default App;
