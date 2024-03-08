import getCityCoordinates from "../../api/getCitySeached";
import React, { useState, useEffect, useMemo } from "react";
import GoogleMapReact from 'google-map-react'

const MAP_KEY = "AIzaSyCPYqhsdXgumUpVJBwvNmLQvLQ2l9r9ofg";

const MapGoogle = ({ searchedCity }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const loadCoordinates = async () => {
      try {
        const coords = await getCityCoordinates(searchedCity);
        setCoordinates({
          lat: coords.lat,
          lng: coords.lon
        });
      } catch (error) {
        console.error('Erro ao carregar coordenadas:', error.message);
        setCoordinates(null);
      }
    };

    if (searchedCity) {
      loadCoordinates();
    } else {
      setCoordinates(null);
    }
  }, [searchedCity]);


  const defaultProps = useMemo(() => {
    return {
      defaultCenter: { lat: 0, lng: 0 },
      defaultZoom: 11
    };
  }, []);

  return (
    <div style={{ height: '400px', width: '700px' }}>
      {coordinates && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_KEY }}
          center={coordinates}
          {...defaultProps}
        >
        </GoogleMapReact>
      )}
    </div>
  );
};

export default MapGoogle;