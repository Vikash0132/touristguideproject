import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = location.state?.query || ''; // Get the query from state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(searchQuery)}.json`,
          {
            params: {
              key: 'YOUR_MAPTILER_API_KEY', // Replace with your MapTiler API key
              limit: 10, // Limit the number of results
            },
          }
        );
        setResults(response.data.features); // Set the results from API response
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchPlaces();
    }
  }, [searchQuery]);

  return (
    <div className="search-results">
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <h3>{result.place_name}</h3>
              <p>{result.text}</p>
              {/* Add any additional information you want to display */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchResults;
