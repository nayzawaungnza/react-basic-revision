import React, { useEffect, useState } from "react";

export default function TripList() {
  let [trips, setTrips] = useState([]);
  let [url, setUrl] = useState("http://localhost:3001/trips");
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTrips(data);
        console.log(trips);
      });
  }, [url]);

  return (
    <div>
      <h1>Trip List</h1>
      <button onClick={() => setUrl("http://localhost:3001/trips")}>All</button>
      <button
        onClick={() => setUrl("http://localhost:3001/trips?location=Myanmar")}
      >
        Filter by location
      </button>
      <ul>
        {trips &&
          trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.name}</h3>
              <span>price : {trip.price}</span>
            </li>
          ))}
        {!trips && <p>No Trips available.</p>}
      </ul>
    </div>
  );
}
