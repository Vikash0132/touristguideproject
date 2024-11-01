import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'TCsVxUMcJl3mlo6cnAXL';

const Map = ({ destination }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${mapboxgl.accessToken}`,
        center: [77.1025, 28.7041], // Default center position [longitude, latitude]
        zoom: 10,
      });

      // Add geolocation control to the map
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      });

      // Ensure geolocation control is triggered after the map loads
      mapRef.current.on('load', () => {
        mapRef.current.addControl(geolocateControl);
        geolocateControl.trigger();
      });

      // Handle missing images in map style
      mapRef.current.on('styleimagemissing', (e) => {
        const id = e.id;
        if (id === 'office_11' || id === 'atm_11') {
          // Replace with a fallback image or placeholder
          const placeholderImage = new Image(20, 20);
          placeholderImage.src = 'path/to/placeholder.png'; // Replace with an actual path
          mapRef.current.addImage(id, placeholderImage);
        }
      });
    }

    // Update map center to selected destination
    if (destination) {
      mapRef.current.flyTo({
        center: destination.coordinates,
        zoom: 12,
      });

      // Add a marker at the destination
      new mapboxgl.Marker()
        .setLngLat(destination.coordinates)
        .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [destination]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div ref={mapContainerRef} style={{ width: '75%', height: '90vh' }} />
    </div>
  );
};

export default Map;
