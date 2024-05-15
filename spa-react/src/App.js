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

  return (
    <div className="app">
      <h1>Hello {name}</h1>
      <button onClick={changeName}>change name</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}> {post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
