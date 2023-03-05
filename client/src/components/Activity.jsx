import React, { useState } from 'react';
import { useActivitiesContext } from '../hooks/useActivityContext.jsx';
import axios from 'axios';

const Activity = ({ activity }) => {

  const { name, date, time, duration, description, location } = activity;

  const { dispatch } = useActivitiesContext();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ activityName, updateActivityName ] = useState(name);
  const [ activityDate, updateActivityDate ] = useState(date);
  const [ activityTime, updateActivityTime ] = useState(time);
  const [ activityDuration, updateActivityDuration ] = useState(duration);
  const [ activityDescription, updateActivityDescription ] = useState(description);
  const [ activityLocation, updateActivityLocation ] = useState(location);

  const handleDelete = () => {
    axios.delete(`/api/activities/${activity._id}`)
      .then(response => response.json())
      .then(data => {
        // from the backend we should be getting back a copy of the data that we deleted
        dispatch({type: 'DELETE_ACTIVITY', payload: data});
      });
  };

  const handleUpdate = () => {
    axios.patch(`/api/activities/${activity._id}`)
      .then(response => response.json())
      .then(updatedActivity => {
        toggleModal();
        dispatch({type: 'UPDATE_ACTIVITY', payload: updatedActivity});
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return(
    <div className="Activty">
      <span>{name}</span>
      <span>Date/Time: {date} @ {time} for {duration} hours</span>
      <span>Location: {location}</span>
      <span>Description: {description}</span>
      <button onClick={toggleModal}>Make Changes</button> 
      <button onClick={handleDelete}>Delete</button>
      {modalOpen && 
        <div>
          <button onClick={toggleModal}>X</button>
          <form className="updateActivityForm" onSubmit={handleUpdate}>
            <label>Name</label>
            <input type='text'
              value={activityName}
              onChange={(e) => updateActivityName(e.target.value)}>
            </input>

            <label>Date</label>
            <input type='text'
              value={activityDate}
              onChange={(e) => updateActivityDate(e.target.value)}>
            </input>

            <label>Time</label>
            <input type='text'
              value={activityTime}
              onChange={(e) => updateActivityTime(e.target.value)}>
            </input>
            
            <label>Duration &#40;hrs&#41;</label>
            <input type='text'
              value={activityDuration}
              onChange={(e) => updateActivityDuration(e.target.value)}>
            </input>

            <label>Location</label>
            <input type='text'
              value={activityLocation}
              onChange={(e) => updateActivityLocation(e.target.value)}>
            </input>

            <label>Description</label>
            <input type='text'
              value={activityDescription}
              onChange={(e) => updateActivityDescription(e.target.value)}>
            </input>

            <input type='submit'>Update Activity</input>
          </form>
        </div>
      }
    </div>

  );
};

export default Activity;