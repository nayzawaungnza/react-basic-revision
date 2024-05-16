import React, { useEffect, useState } from "react";

export default function TripList() {
  let [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/trips")
      .then((response) => response.json())
      .then((data) => {
        setTrips(data);
        console.log(trips);
      });
  }, []);

  return (
    <div>
      <h1>Trip List</h1>
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
