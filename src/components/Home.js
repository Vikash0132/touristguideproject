import React, { useState } from 'react';
import './Home.css'; // Import the CSS specific to this component

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleClick = (destination) => {
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
  };

  const destinations = {
    International: ["Paris", "Kathmandu", "Italy", "Thailand", "Dubai", "Bali"],
    National: ["Dehradun", "Manali", "Goa"]
  };

  return (
    <div className="home-tab">
      {/* Show booking layout if a destination is selected */}
      {selectedDestination ? (
        <div className="booking-page">
          <h1 className="destination-title">{selectedDestination}</h1>
          <div className="booking-content">
            <div className="side-panel">
              <div>
                <label>From: </label>
                <input type="text" placeholder="Starting Location" />
              </div>
              <div>
                <label>To: </label>
                <input type="text" value={selectedDestination} readOnly />
              </div>
              <div className="transport-buttons">
                <button>Bus</button>
                <button>Flight</button>
                <button>Train</button>
              </div>
              <button onClick={() => setSelectedDestination(null)}>Go Back</button>
            </div>
            <div className="map">
              {/* Place your map component or embed code here */}
              <Map destination={selectedDestination} />
            </div>
          </div>
        </div>
      ) : (
        // Default view with destination tiles
        <>
          {Object.keys(destinations).map((category) => (
            <div key={category} className="category-container">
              <div className="category-header">{category}</div>
              <div className="grid-container">
                {destinations[category].map((destination) => (
                  <div
                    key={destination}
                    className={`destination-tile ${destination}`}
                    onClick={() => handleClick(destination)}
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