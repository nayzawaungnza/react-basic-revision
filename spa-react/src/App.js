import "./App.css";
import image from "./assets/image.png";
import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Modal from "./components/Modal";
import PostForm from "./components/PostForm";
function App() {
  let [showModal, setshowModal] = useState(false);
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
  let addPost = (post) => {
    setPosts((prevState) => [...prevState, post]);
    setshowModal(false);
  };
  return (
    <>
      <Navbar setshowModal={setshowModal} />
      <PostList posts={posts} />
      {/* <Modal>
        <h1>Zoom class is available now.</h1>
        <p>
          feel free to <a>join</a> here.
        </p>
      </Modal> */}
      {showModal && (
        <Modal setshowModal={setshowModal} danger>
          <PostForm addPost={addPost} />
        </Modal>
      )}
    </>
  );
}

export default App;
