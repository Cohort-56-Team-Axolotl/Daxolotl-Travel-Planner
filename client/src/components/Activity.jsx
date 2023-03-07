import React, { useState } from 'react';
import { useActivitiesContext } from '../hooks/useActivityContext.jsx';
import axios from 'axios';

const Activity = ({ activity }) => {

  const { name, date, duration, description, location } = activity;

  const { dispatch } = useActivitiesContext();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ activityName, updateActivityName ] = useState(name);
  const [ activityDate, updateActivityDate ] = useState(date);
  const [ activityDuration, updateActivityDuration ] = useState(duration);
  const [ activityDescription, updateActivityDescription ] = useState(description);
  const [ activityLocation, updateActivityLocation ] = useState(location);

  const handleDelete = () => {
    axios.delete(`/api/activities/${activity._id}`)
      .then(response => {
        // from the backend we should be getting back a copy of the data that we deleted
        dispatch({type: 'DELETE_ACTIVITY', payload: response.data});
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      name: activityName,
      date: activityDate,
      duration: activityDuration,
      description: activityDescription,
      location: activityLocation
    };
    axios.patch(`/api/activities/${activity._id}`, updatedData)
      .then(response => {
        toggleModal();
        dispatch({type: 'UPDATE_ACTIVITY', payload: response.data});
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return(
    <div className="Activity">
      <span>{name}</span>
      <span>Date/Time: {date} for {duration} hours</span>
      <span>Location: {location}</span>
      <span>Description: {description}</span>
      <button onClick={toggleModal}>Make Changes</button> 
      <button onClick={handleDelete}>Delete</button>
      {modalOpen && 
        <div className="updateActivityForm">
          <button onClick={toggleModal}>X</button>
          <form onSubmit={handleUpdate}>
            <label>Name</label>
            <input type='text'
              value={activityName}
              onChange={(e) => updateActivityName(e.target.value)}/>
            

            <label>Date</label>
            <input type='text'
              value={activityDate}
              onChange={(e) => updateActivityDate(e.target.value)}/>
            
            <label>Duration &#40;hrs&#41;</label>
            <input type='text'
              value={activityDuration}
              onChange={(e) => updateActivityDuration(e.target.value)}/>

            <label>Location</label>
            <input type='text'
              value={activityLocation}
              onChange={(e) => updateActivityLocation(e.target.value)}/>

            <label>Description</label>
            <input type='text'
              value={activityDescription}
              onChange={(e) => updateActivityDescription(e.target.value)}/>

            <button>Update Activity</button>
          </form>
        </div>
      }
    </div>

  );
};

export default Activity;