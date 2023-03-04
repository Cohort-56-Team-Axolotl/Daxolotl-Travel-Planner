import React, { useContext } from 'react';
import { ItinerariesContext } from '../contexts/ItinerariesContext';

export const useItinerariesContext = () => {
  const context = useContext(ItinerariesContext);
  
  if (!context){
    throw Error('useItinerariesContext should be used inside of the ItinerariesContext Provider');
  }

  return context;
};