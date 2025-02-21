import React, { useState, useEffect } from 'react';
import './Home.css';
import Map from './map';

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [startingLocation, setStartingLocation] = useState(null);
  const [startingCoordinates, setStartingCoordinates] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(null); // 'Bus', 'Train', or 'Flight'
  const [bookingDetails, setBookingDetails] = useState({
    passengers: 1,
    time: '',
    date: '',
    from: '',
    to: ''
  });
  const [dummyTicket, setDummyTicket] = useState(null);

  const destinations = {
    International: ["Paris", "Kathmandu", "Italy", "Thailand", "Dubai", "Bali"],
    National: ["Dehradun", "Manali", "Goa"]
  };

  const famousPlaces = {
    Paris: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    Kathmandu: ["Pashupatinath Temple", "Swayambhunath", "Boudhanath Stupa"],
    Italy: ["Colosseum", "Leaning Tower of Pisa", "Venice Canals"],
    Thailand: ["Grand Palace", "Phi Phi Islands", "Ayutthaya"],
    Dubai: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall"],
    Bali: ["Uluwatu Temple", "Tegallalang Rice Terrace", "Monkey Forest"],
    Dehradun: ["Robber's Cave", "Sahastradhara", "Tapkeshwar Temple"],
    Manali: ["Solang Valley", "Rohtang Pass", "Hidimba Temple"],
    Goa: ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus"]
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates = [position.coords.longitude, position.coords.latitude];
          setStartingCoordinates(userCoordinates);
          setStartingLocation("Your Live Location");
          setBookingDetails((prevDetails) => ({
            ...prevDetails,
            from: "Your Live Location"
          }));
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
      Goa: [74.124, 15.2993]
    };

    setSelectedDestination({
      name: destination,
      coordinates: coordinates[destination]
    });
    setRedirectMessage(null);
    setShowBookingForm(null);
    setDummyTicket(null);
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      to: destination
    }));
  };

  const handleStartingLocationChange = (event) => {
    const location = event.target.value;
    setStartingLocation(location);

    if (location === "Custom Location") {
      setStartingCoordinates([12.9716, 77.5946]);
    } else if (location === "Your Live Location") {
      navigator.geolocation.getCurrentPosition((position) => {
        setStartingCoordinates([position.coords.longitude, position.coords.latitude]);
      });
    }
  };

  const handleTransportClick = (transportType) => {
    if (destinations.National.includes(selectedDestination.name)) {
      setShowBookingForm(transportType);
    } else {
      setRedirectMessage(`${transportType}s don't go that far`);
    }
  };

  const handleBookingFormSubmit = (event) => {
    event.preventDefault();
    setDummyTicket({
      ...bookingDetails,
      destination: selectedDestination.name,
      transportType: showBookingForm
    });
    setShowBookingForm(null);
  };

  return (
    <div className="home-tab">
      {redirectMessage ? (
        <div className="redirect-message">
          <h2>{redirectMessage}</h2>
          <button onClick={() => setRedirectMessage(null)}>Go Back</button>
        </div>
      ) : showBookingForm ? (
        <div className="booking-form">
          <h2>Book Your {showBookingForm}</h2>
          <form onSubmit={handleBookingFormSubmit}>
            <div>
              <label>From: </label>
              <input type="text" value={bookingDetails.from} readOnly />
            </div>
            <div>
              <label>To: </label>
              <input type="text" value={bookingDetails.to} readOnly />
            </div>
            <div>
              <label>Passengers: </label>
              <input
                type="number"
                value={bookingDetails.passengers}
                min="1"
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, passengers: e.target.value })
                }
              />
            </div>
            <div>
              <label>Departure Time: </label>
              <input
                type="time"
                value={bookingDetails.time}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, time: e.target.value })
                }
              />
            </div>
            <div>
              <label>Departure Date: </label>
              <input
                type="date"
                value={bookingDetails.date}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, date: e.target.value })
                }
              />
            </div>
            <button type="submit">Book {showBookingForm}</button>
          </form>
        </div>
      ) : dummyTicket ? (
        <div className="ticket">
          <h2>{dummyTicket.transportType} Ticket</h2>
          <p><strong>From:</strong> {dummyTicket.from}</p>
          <p><strong>To:</strong> {dummyTicket.to}</p>
          <p><strong>Passengers:</strong> {dummyTicket.passengers}</p>
          <p><strong>Departure Date:</strong> {dummyTicket.date}</p>
          <p><strong>Departure Time:</strong> {dummyTicket.time}</p>
          <button onClick={() => setDummyTicket(null)}>Back to Booking</button>
        </div>
      ) : selectedDestination ? (
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
              <button onClick={() => setSelectedDestination(null)}>Go Back</button>
            </div>

            <div className="map">
              <Map destination={selectedDestination} startingCoordinates={startingCoordinates} />
            </div>

            <div className="right-panel">
              <h3>Famous Places</h3>
              <ul>
                {famousPlaces[selectedDestination.name].map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
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
