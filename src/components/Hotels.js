import React, { useState } from 'react';

const Hotels = () => {
  // Static hotel data (you can replace this with actual data later)
  const [hotels] = useState([
    { id: 1, name: 'Hotel Grand', address: '123 Street, City A' },
    { id: 2, name: 'Sunrise Inn', address: '456 Avenue, City B' },
    { id: 3, name: 'Oceanview Hotel', address: '789 Boulevard, City C' },
    { id: 4, name: 'Mountain Retreat', address: '101 Parkway, City D' },
    { id: 5, name: 'Lakeside Lodge', address: '202 Crescent, City E' },
  ]);

  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredHotels, setFilteredHotels] = useState(hotels); // State for filtered results

  // Handle the search logic
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter hotels based on the search query
    const filtered = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(query)
    );
    setFilteredHotels(filtered);
  };

  return (
    <div>
      <h1>Hotels Nearby</h1>

      {/* Search bar for hotels */}
      <input
        type="text"
        placeholder="Search hotels..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />

      {/* Search Results */}
      <h2>Search Results</h2>
      {filteredHotels.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredHotels.map(hotel => (
            <li key={hotel.id}>
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Hotels;
