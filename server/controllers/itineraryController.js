const mongoose = require('mongoose');
const itineraryController = {};

// helper function to create itineraryController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `itineraryController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in itineraryController.${method}. Check server logs for more details.` }
  };
};

module.exports = itineraryController;