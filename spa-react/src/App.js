import "./App.css";
import image from "./assets/image.png";

function App() {
  let name = "Nay Zaw Aung";
  let changeName = () => {
    name = "Aung Aung";
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
