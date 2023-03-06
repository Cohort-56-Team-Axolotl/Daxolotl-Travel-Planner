import React, { useState, useEffect } from 'react';
import Activity from './Activity';
import axios from 'axios';
import { useActivitiesContext } from '../hooks/useActivityContext.jsx';
import ActivityForm from '../components/ActivityForm.jsx';


const Itinerary = ({ itinerary }) => {
  const { itinerary_name, destination, start_date, end_date } = itinerary;

  const { activities, dispatch } = useActivitiesContext();
  const [ modalOpen, setModalOpen ] = useState(false);

  const [ itineraryName, updateItineraryName ] = useState(itinerary_name);
  const [ itineraryDestination, updateItineraryDestination ] = useState(destination);
  const [ itineraryStartDate, updateItineraryStartDate ] = useState(start_date);
  const [ itineraryEndDate, updateItineraryEndDate ] = useState(end_date);

  const handleUpdate = () => {
    axios.patch(`/api/itineraries/${itinerary._id}`)
      .then(response => response.json())
      .then(data => {
        toggleModal();
        dispatch({type: 'UPDATE_ITINERARY', payload: data});
      });
  };

  const handleDelete = () => {
    axios.delete(`/api/itineraries/${itinerary._id}`)
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'DELETE_ITINERARY', payload: data});
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  // itinerary.activities = [{a1}, {a2}, {a3}]
  // req.params -> is itinerary._id
  // const activities = itinerary.activities;
  useEffect(() => {
    
    if(itinerary){
      axios.get(`/api/activities/${itinerary._id}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) dispatch({type: 'SET_ACTIVITIES', payload: data});
        });}
  }, []);

  return (
    <> 
      {itinerary && 
        <div>
          <div>
            <h1>{itinerary.itinerary_name}</h1>
            <h2>{itinerary.destination}</h2>
            <h3>{itinerary.start_date} - {itinerary.end_date}</h3>
            <button onClick={toggleModal}>Make Changes</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <div>
            <h2>Itinerary</h2>
            {activities && activities.map(activity => (
              <Activity key={activity._id} activity={activity} />
            ))}
          </div> 
          <div>
            <ActivityForm />
          </div>
          {modalOpen && 
            <div>
              <button onClick={toggleModal}>x</button>
              <form className='updateItineraryForm' onSubmit={handleUpdate}>
                <label>Name</label>
                <input type='text'
                  value={itineraryName}
                  onChange={(e) => updateItineraryName(e.target.value)}>
                </input>

                <label>Destination</label>
                <input type='text'
                  value={itineraryDestination}
                  onChange={(e) => updateItineraryDestination(e.target.value)}>
                </input>

                <label>Start Date</label>
                <input type='text'
                  value={itineraryStartDate}
                  onChange={(e) => updateItineraryStartDate(e.target.value)}>
                </input>

                <label>End Date</label>
                <input type='text'
                  value={itineraryEndDate}
                  onChange={(e) => updateItineraryEndDate(e.target.value)}>
                </input>

                <input type='submit'>Update Itinerary</input>
              </form>
            </div>
          }
        </div>
      }
    </>
  );
};

export default Itinerary;