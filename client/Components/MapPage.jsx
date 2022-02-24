import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MapComponent from './MapComponent.jsx';

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

const MapPage = () => {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  return (
    <Wrapper apiKey='' render={render}>
      <MapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
};

export default MapPage;