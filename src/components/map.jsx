import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import hotelIconUrl from 'https://via.placeholder.com/25';
import restaurantIconUrl from 'https://via.placeholder.com/25';



const hotelIcon = new L.Icon({
  iconUrl: hotelIconUrl,
  iconSize: [25, 25],
});

const restaurantIcon = new L.Icon({
  iconUrl: restaurantIconUrl,
  iconSize: [25, 25],
});

const MapWithMarkers = () => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const hotelResponse = await axios.get('API_URL_FOR_HOTELS');
        const restaurantResponse = await axios.get('API_URL_FOR_RESTAURANTS');
        
        setHotels(hotelResponse.data);
        setRestaurants(restaurantResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlaces();
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a hotel or restaurant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=YOUR_MAPTILER_API_KEY"
        />

        {filteredHotels.map((hotel) => (
          <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]} icon={hotelIcon}>
            <Popup>{hotel.name}</Popup>
          </Marker>
        ))}

        {filteredRestaurants.map((restaurant) => (
          <Marker key={restaurant.id} position={[restaurant.latitude, restaurant.longitude]} icon={restaurantIcon}>
            <Popup>{restaurant.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <div>
        <h3>Hotels</h3>
        <ul>
          {filteredHotels.map((hotel) => (
            <li key={hotel.id}>{hotel.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Restaurants</h3>
        <ul>
          {filteredRestaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapWithMarkers;

