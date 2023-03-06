import React from 'react';
import { createContext, useReducer } from 'react';

export const ItinerariesContext = React.createContext();

const itineraryReducer = (state, action) => {
  switch(action.type) {
  //Sets initial state (gets all itineraries in the DB for a specific user)
  case 'SET_ITINERARIES':
    const itinerariesArr = action.payload;
    if (itinerariesArr.length > 0){
      itinerariesArr.sort((a,b) => {
        return a.date - b.date;
      });
    }
    return {
      itineraries: action.payload
    };

  case 'CREATE_ITINERARIES':
    const newItineraries = [...state.itineraries, action.payload];
    newItineraries.sort((a,b) => {
      return a.date - b.date;
    });
    return {
      itineraries: newItineraries
    };

  case 'UPDATE_ITINERARY':
    const updatedItineraries = state.itineraries.map((itinerary) => {
      return itinerary._id != action.payload._id ? itinerary : action.payload;
    });
    return {
      itineraries: updatedItineraries
    };

  case 'DELETE_ITINERARY':
    const nonDeletedItineraries = state.itineraries.filter((itinerary) => {
      return itinerary._id != action.payload._id;
    });
    return {
      itineraries: nonDeletedItineraries
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