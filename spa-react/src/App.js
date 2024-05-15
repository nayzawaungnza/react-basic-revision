import React, { useState } from "react";

export default function App() {
  let [count, setCount] = useState(0);
  let increaseCount = () => {
    //setCount(count + 1);//do not make that code
    setCount((prevState) => prevState + 1);
    console.log(setCount);
  };
  return (
    <div>
      <h1>Counter - {count}</h1>
      <button onClick={increaseCount}>increment</button>
    </div>
  );
}
