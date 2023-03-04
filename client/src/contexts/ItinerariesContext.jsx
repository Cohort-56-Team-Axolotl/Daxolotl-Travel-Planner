import React from 'react';
import { createContext, useReducer } from 'react';

export const ItinerariesContext = React.createContext();

const itineraryReducer = (state, action) => {
  switch(action.type) {
  //Sets initial state (gets all itineraries in the DB for a specific user)
  case 'SET_ITINERARIES':
    return {
      itineraries: action.payload
    };
  case 'CREATE_ITINERARIES':
    return {
      itineraries: [...state.itineraries, action.payload]
    };
  default:
    return state;
  }
};

export const ItinerariesContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(itineraryReducer, {itineraries: null});

  return (
    <ItinerariesContext.Provider value={{...state, dispatch}}>
      {children}
    </ItinerariesContext.Provider>
  );
};