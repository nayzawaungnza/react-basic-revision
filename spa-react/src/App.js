import "./App.css";
import image from "./assets/image.png";

function App() {
  let name = "Nay Zaw Aung";
  return (
    <div>
      <h1>Hello {name}</h1>
      {/* public way */}
      {/* absolute path */}
      <img src="http://localhost:3000/image.png" alt="" />
      {/* relative path */}
      <img src="/image.png" alt="" />

      {/* import way */}
      <img src={image} alt="" />
    </div>
  );
}

export default App;
