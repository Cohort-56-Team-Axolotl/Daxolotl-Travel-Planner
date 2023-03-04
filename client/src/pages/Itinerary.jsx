import React, { useEffect } from 'react';

const Itineraries = React.createContext();

const Itinerary = () => {

  

  useEffect(() => {
    console.log('component loaded, we need to query database for our list of itineraries and send it to state?');
  });


  // need to have access to state and render certain number of sidebar itinerary buttons to navigate between different itineraries we have planned

  return (
    <div>
      This is the iterinary page
    </div>
  );

};

export default Itinerary;