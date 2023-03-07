import React from 'react';
import { createContext, useReducer } from 'react';

export const ItinerariesContext = createContext();

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

  case 'UPDATE_ITINERARY':
    return {
      itineraries: state.itineraries.map((itinerary) => itinerary._id !== action.payload._id ? itinerary : action.payload)
    };

  case 'DELETE_ITINERARY':
    return {
      itineraries: state.itineraries.filter((itinerary) => itinerary._id !== action.payload._id)
    };
    
  default:
    return state;
  }
};

export const ItinerariesContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(itineraryReducer, {itineraries: []});

  return (
    <ItinerariesContext.Provider value={{...state, dispatch}}>
      {children}
    </ItinerariesContext.Provider>
  );
};