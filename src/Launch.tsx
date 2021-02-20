import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';

interface LaunchInterface {
  status: string;
  payload: {
    name: string;
    details: string;
    flight_number: number; // API labels flight numbers as numbers
    success: boolean;
    date_local: string; // from API
    id: string;
  };
}

const launch = () => {
  const [launch, setLaunch] = useState<LaunchInterface>({
    status: 'loading',
    payload: {
      name: '',
      details: '',
      flight_number: 0,
      success: false,
      date_local: '',
      id: '',
    },
  });
  const service = launch.status;
  console.log(service);
  console.log(launch.payload);

  useEffect(() => {
    axios
      .get('https://api.spacexdata.com/v4/launches/5eb87d27ffd86e000604b372')
      .then((response) => response)
      .then((response) =>
      setLaunch({ status: 'loaded', payload: response.data }),
      )
      .catch((error) => setLaunch({ status: 'error', payload: error }));
  }, []);

  return (
    <>
      {service === 'loading' && <div>Loading...</div>}
      {service === 'loaded' && (
        <>
          <div>Name: {launch.payload.name}</div>
          <div>Details: {launch.payload.details}</div>
          <div>Flight Number: {launch.payload.flight_number}</div>
          <div>Date: {launch.payload.date_local}</div>
          <div>Launch ID: {launch.payload.id}</div>
          <div>Success: {launch.payload.success.toString()}</div>
        </>
      )}
      {service === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </>
  );
};

export default launch;
