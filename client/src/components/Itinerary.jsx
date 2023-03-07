import React, { useState, useEffect } from 'react';
import Activity from './Activity';
import axios from 'axios';
import { useActivitiesContext } from '../hooks/useActivityContext.jsx';
import { useItinerariesContext } from '../hooks/useItineraryContext';
import ActivityForm from '../components/ActivityForm.jsx';
// import { format } from 'date-fns';


const Itinerary = ({ itinerary }) => {
  const { itinerary_name, destination, start_date, end_date } = itinerary;

  const { activities, dispatch: dispatchForActivity } = useActivitiesContext();
  const { dispatch } = useItinerariesContext();
  const [ modalOpen, setModalOpen ] = useState(false);

  const [ itineraryName, updateItineraryName ] = useState(itinerary_name);
  const [ itineraryDestination, updateItineraryDestination ] = useState(destination);
  const [ itineraryStartDate, updateItineraryStartDate ] = useState(start_date);
  const [ itineraryEndDate, updateItineraryEndDate ] = useState(end_date);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updated = {
      itinerary_name: itineraryName,
      destination: itineraryDestination,
      start_date: itineraryStartDate,
      end_date: itineraryEndDate
    };
    
    axios.patch(`/api/itineraries/${itinerary._id}`, updated)
      .then(response => {
        toggleModal();
        console.log('updated is:', response.data);
        dispatch({type: 'UPDATE_ITINERARY', payload: response.data});
      });
  };

  const handleDelete = () => {
    axios.delete(`/api/itineraries/${itinerary._id}`)
      .then(response => {
        console.log('deleted is', response.data);
        dispatch({type: 'DELETE_ITINERARY', payload: response.data});
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  // itinerary.activities = [{a1}, {a2}, {a3}]
  // req.params -> is itinerary._id
  // const activities = itinerary.activities;
  useEffect(() => {
    console.log('itinerary is', itinerary);
    if(itinerary && itinerary.activities !== null){
      axios.get(`/api/activities/${itinerary._id}`)
        .then(response => {
          console.log('this is the activities for this itinerary', response.data);
          if (response.status === 200) dispatchForActivity({type: 'SET_ACTIVITIES', payload: response.data});
        });}
  }, []);

  return (
    <> 
      {itinerary && 
        <div>
          <div className="ItineraryOverview">
            <h1>{itinerary.itinerary_name}</h1>
            <h2>{itinerary.destination}</h2>
            <h3>{itinerary.start_date} - {itinerary.end_date}</h3>
            <div>
              <button onClick={toggleModal}>Make Changes</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
          <div>
            {/* <h2>Itinerary</h2> */}
            {activities && activities.map(activity => (
              <Activity key={activity._id} activity={activity} />
            ))}
          </div> 
          <div>
            {itinerary && <ActivityForm id={itinerary._id}/>}
          </div>
          {modalOpen && 
            <div className='updateItineraryForm'>
              <button onClick={toggleModal}>x</button>
              <form onSubmit={handleUpdate}>
                <label>Name</label>
                <input type='text'
                  value={itineraryName}
                  onChange={(e) => updateItineraryName(e.target.value)}/>
                

                <label>Destination</label>
                <input type='text'
                  value={itineraryDestination}
                  onChange={(e) => updateItineraryDestination(e.target.value)}/>
                

                <label>Start Date</label>
                <input type='text'
                  value={itineraryStartDate}
                  onChange={(e) => updateItineraryStartDate(e.target.value)}/>

                <label>End Date</label>
                <input type='text'
                  value={itineraryEndDate}
                  onChange={(e) => updateItineraryEndDate(e.target.value)}/>

                <button>Update Itinerary</button>
              </form>
            </div>
          }
        </div>
      }
    </>
  );
};

export default Itinerary;