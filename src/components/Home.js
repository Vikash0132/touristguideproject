// Home.js
import React, { useState } from 'react';

const Home = ({ destination }) => {
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  // Handle booking confirmation
  const handleBooking = () => {
    setIsBooked(true);
  };

  // Reset selection when clicking on a transport option
  const selectTransport = (transport) => {
    setSelectedTransport(transport);
    setIsBooked(false);
    setPassengers(1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h1>Travel Options to {destination.name}</h1>

      {/* Transport Buttons */}
      <div className="transport-buttons">
        <button onClick={() => selectTransport("bus")}>Bus</button>
        <button onClick={() => selectTransport("train")}>Train</button>
        <button onClick={() => selectTransport("flight")}>Flight</button>
      </div>

      {/* Conditional Rendering based on selected transport */}
      <div style={{ marginTop: '20px' }}>
        {selectedTransport === "bus" && (
          <div>
            <h1>404</h1>
            <p>No buses go that far.</p>
          </div>
        )}

        {selectedTransport === "train" && (
          <div>
            <h1>404</h1>
            <p>No trains go that far.</p>
          </div>
        )}

        {selectedTransport === "flight" && (
          <div>
            <h1>Book a Flight to {destination.name}</h1>
            <label>
              Number of Passengers:
              <input
                type="number"
                min="1"
                max="10"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
            <br /><br />
            <button onClick={handleBooking}>Book Ticket</button>

            {isBooked && (
              <div style={{ marginTop: '20px' }}>
                <h2>Booking Confirmed!</h2>
                <p>Airline: Random Airlines</p>
                <p>Passengers: {passengers}</p>
                <p>Destination: {destination.name}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
