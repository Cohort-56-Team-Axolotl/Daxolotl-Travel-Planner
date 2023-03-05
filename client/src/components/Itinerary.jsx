import React from 'react';
import Activity from './Activity';
import axios from 'axios';
import { useActivitiesContext } from '../hooks/useActivityContext.jsx';


const Itinerary = ({ itinerary }) => {
  const { activities, dispatch } = useActivitiesContext();

  // itinerary.activities = [{a1}, {a2}, {a3}]
  // req.params -> is itinerary._id
  // const activities = itinerary.activities;

  axios.get(`/api/activities/${itinerary._id}`)
    .then(response => response.json())
    .then(data => {
      dispatch({type: 'SET_ACTIVITIES', payload: data});
    });

  return (
    <>
      <div>
        <h1>{itinerary.itinerary_name}</h1>
        <h3>{itinerary.start_date} - {itinerary.end_date}</h3>
      </div>
      <div>
        <h2>Itinerary</h2>
        {activities && activities.map(activity => (
          <Activity key={activity._id} activity={activity} />
        ))}
      </div> 
    </>
  );
};

export default Itinerary;