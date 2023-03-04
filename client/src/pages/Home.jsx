import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Itinerary from '../components/Itinerary.jsx';
import { useItinerariesContext } from '../hooks/useItineraryContext.jsx';
import ActivityForm from '../components/ActivityForm';


const Home = () => {
  const { itineraries, dispatch } = useItinerariesContext();
  
  useEffect(() => {
    console.log('component loaded, at this point we need to query database for our list of itineraries and send it to state?');
    //Fetch request will return an array of itineraries for the specific user as data
    // pass results itinerarylistarray into dispatch()
  });
  return(
    <>
      <Navbar />
      <div className="ItineraryList">
        {/* If itineraries is NOT NULL, then perform what is after the && */}
        {itineraries && itineraries.map((itinerary) => (
          <Itinerary key = {itinerary._id} itinerary = {itinerary} />
        )) }
      </div>
      <ActivityForm />
    </>
  );
};

export default Home;