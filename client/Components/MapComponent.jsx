import React, {useRef, useEffect} from 'react';

function MapComponent({ center, zoom, }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return (
    <>
      <h1>Test</h1>
      <div ref={ref} id="map" />
    </>
  );
}

export default MapComponent;