import "./App.css";
import image from "./assets/image.png";
import { useState } from "react";

function App() {
  //let name = "Nay Zaw Aung";
  let [name, setName] = useState("Nay Zaw Aung"); //useState return array by [getter, setter]
  let changeName = () => {
    setName("Aung Aung");
    console.log(name);
  };
  return (
    <div className="app">
      <h1>Hello {name}</h1>
      <button onClick={changeName}>change name</button>
    </div>
  );
}

export default App;
