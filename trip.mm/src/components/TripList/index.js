import React, { useState } from "react";
import "./index.css";
import useFetch from "../../hooks/useFetch";
export default function TripList() {
  let [url, setUrl] = useState("http://localhost:3001/trips");
  let { data: trips, loading, error } = useFetch(url, { type: "GET" });
  return (
    <div className="container">
      {error && <p>{error}</p>}

      {!error && (
        <div className="flex-container">
          <h1>Trip List</h1>
          {loading && <p>Loading Trip...</p>}
          <div>
            <button onClick={() => setUrl("http://localhost:3001/trips")}>
              All
            </button>
            <button
              onClick={() =>
                setUrl("http://localhost:3001/trips?location=Myanmar")
              }
            >
              Filter by location
            </button>
          </div>
          <ul className="trip-list">
            {trips &&
              trips.map((trip) => (
                <li key={trip.id} className="trip">
                  <h3>{trip.name}</h3>
                  <span>price : {trip.price}</span>
                </li>
              ))}
            {!trips && <p>No Trips available.</p>}
          </ul>
        </div>
      )}
    </div>
  );
}
