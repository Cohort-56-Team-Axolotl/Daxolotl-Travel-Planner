import React, { useState } from 'react';
import { useActivitesContext } from '../hooks/useActivityContext.jsx';
import axios from 'axios';

const ActivityForm = () => {
  const { dispatch } = useActivitesContext();
  const [activityName, setActivityName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    // prevents the entire page from refreshing when submit is clicked
    e.preventDefault();
    //Post request to add a new activity -> should return data as the new activity
    const newActivity = { activityName, date, time, duration, description, location };

    const response = await axios.post('/api/activities', newActivity, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const newData = await response.json();

    if(response.status === 200){
      setActivityName('');
      setDate('');
      setTime('');
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
          value = {activityName}
          onChange = {(e) => setActivityName(e.target.value)}
        />

        <label>Date</label>
        <input type='date' 
          value = {date}
          onChange = {(e) => setDate(e.target.value)}
        />

        <label>Start Time</label>
        <input type='time' 
          value = {time}
          onChange = {(e) => setTime(e.target.value)}
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