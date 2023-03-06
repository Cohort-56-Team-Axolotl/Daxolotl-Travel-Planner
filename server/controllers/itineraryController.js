const Itinerary = require('../models/itineraryModel');
const mongoose = require('mongoose');
const itineraryController = {};
const db = require('../models/sqlModel');

// helper function to create itineraryController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `itineraryController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in itineraryController.${method}. Check server logs for more details.` }
  };
};

// user id will be from the cookie
// read: aka get all itineraries by user / user id
// users_itineraries table 
itineraryController.getAllItineraries = async (req, res, next) => {
//Get user ID
  const user_id = req.cookies.ssid;

  const query = {
    text: `SELECT * FROM public.users_itineraries
    WHERE user_id = $1;`,
    values: [user_id]
  };

  try {
    const response = await db.query(query.text, query.values);
    // console.log(response);
    const { rows } = response;

    res.locals.itineraries = [];

    rows.forEach(itinerary => {
      Itinerary.findOne({_id: itinerary.mongo_id})
        .then(itineraryDoc => {
          if(itineraryDoc === null){
            return next(createErr({
              method: 'getAllItineraries',
              type: 'ItineraryNotFound'
            }));
          }
          res.locals.itineraries.push(itineraryDoc);
        })
        .catch(err => (next(createErr({
          method: 'getAllItineraries',
          type: 'findError',
          err
        }))));
    });
    return next();

  } catch (err) {
    return next(createErr({
      method: 'getAllItineraries',
      type: 'errorInCatchBlock',
      err
    }));
  }
};


// read: get itineraries by id for now
itineraryController.getItinerary = (req, res, next) => {
  const { itineraryid } = req.params;
  Itinerary.findOne({ _id: itineraryid })
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

//TODO add to users_itineraries DB
itineraryController.createItinerary = (req, res, next) => {
  const { itinerary_name, destination, start_date, end_date } = req.body;

  // TODO error handling for createItinerary if any of these are empty?
  const user_id = req.cookies.ssid;
  
  // shorthand assignment
  Itinerary.create({ itinerary_name, destination, start_date, end_date })
    .then(itineraryDoc => {
      const query = {
        text : `
          INSERT INTO users_itineraries
            (user_id, mongo_id)
          VALUES
            ($1, $2)
          RETURNING *
        `,
        values : [
          user_id,
          itineraryDoc._id
        ]
      };
      db.query(query.text, query.value)
        .then(response => {
          const { rows } = response;
          console.log(`inserted itinerary._id ${rows[0]} into db`);
        })
        .catch(err => (next(createErr({
          method: 'createItinerary',
          type: 'insertionIssue',
          err
        }))));
      res.locals.newItinerary = itineraryDoc;
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
  const { itineraryid } = req.params;

  // TODO update object from req.body destructure into variables

  Itinerary.findOneAndUpdate({ _id: itineraryid }, {...req.body}, { new:true })
    .then(itineraryDoc => {
      if (itineraryDoc === null) {
        return next(createErr({
          method: 'updateItinerary',
          type: 'ItineraryNotFound'
        }));
      }
      res.locals.updated = itineraryDoc;
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
  const { itineraryid } = req.params;
  Itinerary.findOneAndDelete({ _id: itineraryid })
    .then(itineraryDoc => {
      if (itineraryDoc === null) {
        return next(createErr({
          method: 'deleteItinerary',
          type: 'ItineraryNotFound'
        }));
      }
      res.locals.deleted = itineraryDoc;
      return next();
    })
    .catch(err => (next(createErr({
      method: 'deleteItinerary',
      type: 'findIssue',
      err
    }))));
};

module.exports = itineraryController;