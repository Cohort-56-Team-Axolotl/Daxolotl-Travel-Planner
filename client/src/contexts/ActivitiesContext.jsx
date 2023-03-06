import React from 'react';
import { createContext, useReducer } from 'react';

export const ActivitiesContext = React.createContext();

// reducer
const activityReducer = (state, action) => {
  switch(action.type) {
  case 'SET_ACTIVITIES':
    const activitiesArr =  action.payload;
    if (activitiesArr.length > 0){
      activitiesArr.sort((a,b) => {
        return a.date - b.date;
      });
    }
    
    return {
      activities: action.payload
    };

  case 'CREATE_ACTIVITY':
    const newActivities = [...state.activities, action.payload];
    newActivities.sort((a,b) => {
      return a.date - b.date;
    });
    return {
      activities: newActivities
    };

  case 'UPDATE_ACTIVITY':
    // map through the current activities state and replace the one with the matching id with our new action.payload
    const updatedActivities = state.activities.map((activity) => {
      return activity._id != action.payload._id ? activity : action.payload;
    });
    return {
      activities: updatedActivities
    };
    
  case 'DELETE_ACTIVITY':
    // filter through the current activities state and delete the one with the matching id with our new action.payload
    const nonDeletedActivities = state.activities.filter((activity) => {
      return activity._id != action.payload._id;
    });

    return {
      activities: nonDeletedActivities
    };
    
  default:
    return state;
  }
};

export const ActivitiesContextProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer(activityReducer, {activites: []});

  return(
    <ActivitiesContext.Provider value={{...state, dispatch}}>
      {children}
    </ActivitiesContext.Provider>
  );
};


