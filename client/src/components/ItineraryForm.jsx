import React, { useState } from 'react';
import { useItinerariesContext } from '../hooks/useItineraryContext.jsx';
import axios from 'axios';

const ItineraryForm = () => {
  const { dispatch } = useItinerariesContext();
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Post request to add a new itinerary -> should return data as the new itinerary
    const newItinerary = { title, destination, start_date, end_date };

    const response = await axios.post('/api/itineraries', newItinerary, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const newData = await response.json();

    if(response.status === 200){
      setTitle('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      dispatch({type: 'CREATE_ITINERARIES', payload: newData});
    }


  };


  return(
    <div>
      <form className='itineraryForm' onSubmit = {handleSubmit}>
        <label>Title</label>
        <input type='text'
          value = {title}
          onChange = {(e) => setTitle(e.target.value)}
        />

        <label>Destination</label>
        <input type='text' 
          value = {destination}
          onChange = {(e) => setDestination(e.target.value)}
        />

        <label>Start Date</label>
        <input type='date' 
          value = {start_date}
          onChange = {(e) => setStartDate(e.target.value)}
        />

        <label>End Date</label>
        <input type='date'
          value = {end_date}
          onChange = {(e) => setEndDate(e.target.value)}
        />

        <button>Add Itinerary</button>
      </form>
    </div>
  );
};

export default ItineraryForm;