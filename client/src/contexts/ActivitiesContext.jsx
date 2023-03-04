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
