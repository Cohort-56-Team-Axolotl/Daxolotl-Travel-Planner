import React, { useState } from 'react';
import { useActivitiesContext } from '../hooks/useActivityContext.jsx';
import axios from 'axios';

const ActivityForm = () => {
  const { dispatch } = useActivitiesContext();
  const [name, setActivityName] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    // prevents the entire page from refreshing when submit is clicked
    e.preventDefault();
    //Post request to add a new activity -> should return data as the new activity
    const newActivity = { name, date, duration, description, location };

    const response = await axios.post('/api/activities', newActivity, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const newData = await response.json();

    if(response.status === 200){
      setActivityName('');
      setDate('');
      setDuration('');
      setDescription('');
      setLocation('');
      dispatch({type: 'CREATE_ACTIVITY', payload: newData});
    }
  };


  return(
    <div>
      <form className='activityForm' onSubmit = {handleSubmit}>
        <label>Activity Name</label>
        <input type='text'
          value = {name}
          onChange = {(e) => setActivityName(e.target.value)}
        />

        <label>Start Date and Time</label>
        <input type='datetime-local' 
          value = {date}
          onChange = {(e) => setDate(e.target.value)}
        />

        <label>Duration</label>
        <input type='number'
          value = {duration}
          onChange = {(e) => setDuration(e.target.value)}
          min='0'
          placeholder='in minutes'
        />

        <label>Description</label>
        <input type='text' 
          value = {description}
          onChange = {(e) => setDescription(e.target.value)}
        />

        <label>Location</label>
        <input type='text' 
          value = {location}
          onChange = {(e) => setLocation(e.target.value)}
        />

        <button>Add Activity</button>
      </form>
    </div>
  );
};

export default ActivityForm;