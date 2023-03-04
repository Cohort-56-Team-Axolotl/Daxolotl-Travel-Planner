const Itinerary = require('../models/itineraryModel');
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

// read: aka get all itineraries by user / user id
// users_itineraries table 
itineraryController.getAllItineraries = (req, res, next) => {
  next();
};


// read: get itineraries by id for now
itineraryController.getItinerary = (req, res, next) => {
  const { id } = req.params;
  Itinerary.findOne({ _id: id })
    .then(itineraryDoc => {
      if (itineraryDoc === null) {
        return next(createErr({
          method: 'getItinerary',
          type: 'ItineraryNotFound'
        }));
      }
      res.locals.itinerary = itineraryDoc;
      return next();
    })
    .catch(err => (next(createErr({
      method: 'getItinerary',
      type: 'findIssue',
      err
    }))));
};

// create: 
itineraryController.createItinerary = (req, res, next) => {
  const { itinerary_name, destination, start_date, end_date } = req.body;
  const activities = [];

  // TODO error handling for createItinerary if any of these are empty?

  // shorthand assignment
  Itinerary.create({ itinerary_name, destination, start_date, end_date, activities })
    .then(itineraryDoc => {
      res.locals.itinerary = itineraryDoc;
      return next();
    })
    .catch(err => (next(createErr({
      method: 'createItinerary',
      type: 'creationIssue',
      err
    }))));
};

// update by id
itineraryController.updateItinerary = (req, res, next) => {
  const { id } = req.params;

  // TODO update object from req.body destructure into variables
  const { update } = req.body;

  Itinerary.findOneAndUpdate({ _id: id }, { update })
    .then(itineraryDoc => {
      if (itineraryDoc === null) {
        return next(createErr({
          method: 'updateItinerary',
          type: 'ItineraryNotFound'
        }));
      }
      res.locals.Itinerary = itineraryDoc;
      return next();
    })
    .catch(err => (next(createErr({
      method: 'updateItinerary',
      type: 'findIssue',
      err
    }))));
};

// delete by id
itineraryController.deleteItinerary = (req, res, next) => {
  const { id } = req.params;
  Itinerary.findOneAndDelete({ _id: id })
    .then(itineraryDoc => {
      if (itineraryDoc === null) {
        return next(createErr({
          method: 'deleteItinerary',
          type: 'ItineraryNotFound'
        }));
      }
      res.locals.Itinerary = itineraryDoc;
      return next();
    })
    .catch(err => (next(createErr({
      method: 'deleteItinerary',
      type: 'findIssue',
      err
    }))));
};

module.exports = itineraryController;