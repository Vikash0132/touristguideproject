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

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      });
      mapRef.current.addControl(geolocateControl);
      geolocateControl.trigger();
    }

    if (destination) {
      mapRef.current.flyTo({
        center: destination.coordinates,
        zoom: 12,
      });

      new mapboxgl.Marker()
        .setLngLat(destination.coordinates)
        .addTo(mapRef.current);
    }

    return () => mapRef.current && mapRef.current.remove();
  }, [destination]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
