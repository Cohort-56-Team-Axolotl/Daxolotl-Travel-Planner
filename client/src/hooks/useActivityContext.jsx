import React, { useContext } from 'react';
import { ActivitiesContext } from '../contexts/ActivitiesContext.jsx';



export const useActivitesContext = () => {
  const context = useContext(ActivitiesContext);

  if (!context) {
    throw Error('useActivitiesContext should be used inside of the ActivitiesContext Provider');
  }

  return context;
};