import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the CSS specific to this component
import Map from './map';

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [startingLocation, setStartingLocation] = useState(null);
  const [startingCoordinates, setStartingCoordinates] = useState(null);
  const [transportMessage, setTransportMessage] = useState(null);

  const isInternational = selectedDestination
    ? ["Paris", "Kathmandu", "Italy", "Thailand", "Dubai", "Bali"].includes(selectedDestination.name)
    : false;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = [position.coords.longitude, position.coords.latitude];
          setStartingCoordinates(userCoordinates);
          setStartingLocation("Your Live Location");
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleDestinationClick = (destination) => {
    const coordinates = {
      Paris: [2.3522, 48.8566],
      Kathmandu: [85.324, 27.7172],
      Italy: [12.4964, 41.9028],
      Thailand: [100.5018, 13.7563],
      Dubai: [55.2708, 25.2048],
      Bali: [115.1889, -8.4095],
      Dehradun: [78.0322, 30.3165],
      Manali: [77.1887, 32.2396],
      Goa: [74.124, 15.2993],
    };

    setSelectedDestination({
      name: destination,
      coordinates: coordinates[destination],
    });
    setTransportMessage(null); // Reset message when selecting a new destination
  };

  const handleStartingLocationChange = (event) => {
    const location = event.target.value;
    setStartingLocation(location);

    if (location === "Custom Location") {
      setStartingCoordinates([12.9716, 77.5946]); // Example custom coordinates
    } else if (location === "Your Live Location") {
      navigator.geolocation.getCurrentPosition((position) => {
        setStartingCoordinates([position.coords.longitude, position.coords.latitude]);
      });
    }
  };

  const handleTransportClick = (transportType) => {
    if (isInternational && (transportType === 'Bus' || transportType === 'Train')) {
      setTransportMessage(`${transportType}s don't go that far`);
    } else {
      setTransportMessage(null);
      // Add the logic here to handle valid transports, like Flight, if needed
    }
  };

  const destinations = {
    International: ["Paris", "Kathmandu", "Italy", "Thailand", "Dubai", "Bali"],
    National: ["Dehradun", "Manali", "Goa"]
  };

  return (
    <div className="home-tab">
      {selectedDestination ? (
        <div className="booking-page">
          <h1 className="destination-title">{selectedDestination.name}</h1>
          <div className="booking-content">
            <div className="side-panel">
              <div>
                <label>From: </label>
                <input
                  type="text"
                  placeholder="Starting Location"
                  value={startingLocation || ""}
                  onChange={handleStartingLocationChange}
                />
              </div>
              <div>
                <label>To: </label>
                <input type="text" value={selectedDestination.name} readOnly />
              </div>
              <div className="transport-buttons">
                <button onClick={() => handleTransportClick("Bus")}>Bus</button>
                <button onClick={() => handleTransportClick("Flight")}>Flight</button>
                <button onClick={() => handleTransportClick("Train")}>Train</button>
              </div>
              {transportMessage && <div className="transport-message">{transportMessage}</div>}
              <button onClick={() => setSelectedDestination(null)}>Go Back</button>
            </div>
            <div className="map">
              <Map destination={selectedDestination} startingCoordinates={startingCoordinates} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {Object.keys(destinations).map((category) => (
            <div key={category} className="category-container">
              <div className="category-header">{category}</div>
              <div className="grid-container">
                {destinations[category].map((destination) => (
                  <div
                    key={destination}
                    className={`destination-tile ${destination}`}
                    onClick={() => handleDestinationClick(destination)}
                    style={{ cursor: "pointer" }}
                  >
                    {destination}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
