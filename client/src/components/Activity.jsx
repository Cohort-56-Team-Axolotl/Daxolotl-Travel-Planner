import React from 'react';

const Activity = ({ activity }) => {


  return(
    <div className="Activty">
      <span>{activity.name}</span>
      <span>Date/Time: {activity.date} @ {activity.time} for {activity.duration} hours</span>
      <span>Location: {activity.location}</span>
      <span>Description: {activity.description}</span>
      {/* add update and delete buttons */}
    </div>

  );
};

export default Activity;