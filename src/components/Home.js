import React, { useState } from 'react';
import './Home.css'; // Import the CSS specific to this component
import Map from './map'; // Import the Map component

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Placeholder search results for demonstration
  const searchResults = selectedDestination
    ? [
      {
        place_name: selectedDestination,
        geometry: {
          coordinates: [77.1025, 28.7041] // Example coordinates; replace with real data
        },
        text: "Sample Location"
      }
    ]
    : [];

  const handleClick = (destination) => {
    setSelectedDestination(destination);
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
              <button onClick={() => setSelectedDestination(null)} className="go-back-button">
                Go Back
              </button>
            </div>
            <div className="map-container">
              <Map searchResults={searchResults} />
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
