import "./App.css";
import image from "./assets/image.png";
import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Modal from "./components/Modal";
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
        <Modal danger>
          <h1>Term and Condition</h1>
          <p>loerm</p>
          <button onClick={() => setshowModal(false)}>close</button>
        </Modal>
      )}
    </>
  );
}

export default App;
