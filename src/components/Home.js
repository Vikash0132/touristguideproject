import React, { useState } from 'react';
import './Home.css';
import Map from './map';

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

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
    International: [
      { name: "Paris", img: "/paris.jpg" },
      { name: "Kathmandu", img: "/ktm.jpg" },
      { name: "Italy", img: "/Italy.jpg" },
      { name: "Thailand", img: "/Thailand.jpg" },
      { name: "Dubai", img: "/Dubai.jpg" },
      { name: "Bali", img: "/bali.jpg" }
    ],
    National: [
      { name: "Dehradun", img: "/dehradun.jpg" },
      { name: "Manali", img: "/manali.jpg" },
      { name: "Goa", img: "/goa.jpg" }
    ]
  };

  return (
    <div className="home-tab">
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
        <>
          {Object.keys(destinations).map((category) => (
            <div key={category} className="category-container">
              <div className="category-header">{category}</div>
              <div className="grid-container">
                {destinations[category].map((destination) => (
                  <div
                    key={destination.name}
                    className="destination-tile"
                    onClick={() => handleClick(destination.name)}
                    style={{
                      backgroundImage: `url(${destination.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="tile-text">{destination.name}</span>
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
