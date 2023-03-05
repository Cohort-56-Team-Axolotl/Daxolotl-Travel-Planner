import React from 'react';
import { createContext, useReducer } from 'react';

export const ActivitiesContext = React.createContext();

// reducer
const activityReducer = (state, action) => {
  switch(action.type) {
  case 'SET_ACTIVITIES':
    return {
      activities: action.payload
    };
  case 'CREATE_ACTIVITY':
    return {
      activities: [...state.activities, action.payload]
    };
  case 'UPDATE_ACTIVITY':
    // map through the current activities state and replace the one with the matching id with our new action.payload
    const newActivities = state.activities.map((activity) => {
      // insert logic here
    });
    return {
      activities: newActivities
    }
  case 'DELETE_ACTIVITY':
    // filter through the current activities state and delete the one with the matching id with our new action.payload
    // const newActivities = state.activities.filter((activity) => {
    //   // insert logic here
    // });

    return {
      activities: newActivities
    }
  default:
    return state;
  }
};

export const ActivitiesContextProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer(activityReducer, {activites: null});

  return(
    <ActivitiesContext.Provider value={{...state, dispatch}}>
      {children}
    </ActivitiesContext.Provider>
  );
};



// provider
  // render within here
