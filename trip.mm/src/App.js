import { useEffect, useState } from "react";
import "./App.css";
import TripList from "./components/TripList";

function App() {
  let [data, setData] = useState("my data");
  let myFunction = () => {
    setData("update data");
  };
  useEffect(() => {
    myFunction();
    console.log("running");
  }, [myFunction]);
  return (
    <div className="App">
      <h1>Hello Trip.mm</h1>
      <TripList />
    </div>
  );
}

export default App;
//react is not rerender in same data
