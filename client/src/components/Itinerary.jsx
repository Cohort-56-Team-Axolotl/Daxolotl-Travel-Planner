import React from 'react';
import Activity from './Activity';
import axios from 'axios';


const Itinerary = ({ itinerary }) => {

  // need to render an overview component (For now just itinerary.title & display itinerary.start_date - itinerary.end_date)
  // activities list
  // acc activites box
  // yelp recc box
  // itinerary.activites = [{a1}, {a2}, {a3}]
  // req.params -> is itinerary._id
  const activites = itinerary.activites;

  axios.get('/api/activities/' + itinerary._id)
    .then(response => response.json())
    .then(data => {
      // NEED TO FIGURE THIS OUT
    });

  return (
    <>
      <div>
        <h1>{itinerary.title}</h1>
        <h3>{itinerary.start_date} - {itinerary.end_date}</h3>
      </div>
      <div>
        <h2>Itinerary</h2>
        {activites && activites.map(activity => (
          <Activity key={activity._id} activity={activity} />
        ))}
      </div> 
    </>
  );
};

export default Itinerary;