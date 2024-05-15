import "./App.css";
import image from "./assets/image.png";
import { useState } from "react";

function App() {
  //let name = "Nay Zaw Aung";
  let [name, setName] = useState("Nay Zaw Aung"); //useState return array by [getter, setter]

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
  let changeName = () => {
    setName("Aung Aung");
    console.log(name);
  };

  let deletePost = (id) => {
    setPosts((prevState)=>prevState.filter((post=> post.id !== id)))
    console.log(`post delete - ${id}`);
  };

  return (
    <div className="app">
      <h1>Hello {name}</h1>
      <button onClick={changeName}>change name</button>
      <ul>
        {!!posts.length && posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => deletePost(post.id)}>delete</button>
            {/* add parameter for by passing function reference //importent */}
          </li>
        ))}
        {!posts.length && <p>No posts available.</p>}
      </ul>
    </div>
  );
}

export default App;
