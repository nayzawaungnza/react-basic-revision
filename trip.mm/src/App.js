import { useState } from "react";
import "./App.css";
import TripList from "./components/TripList";

function App() {
  let [show, setShow] = useState(false);
  return (
    <div className="App">
      <h1>Hello Trip.mm</h1>
      <button onClick={() => setShow(true)}>hide trip</button>
      {!show && <TripList />}
    </div>
  );
}

export default App;
