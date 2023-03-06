const Activity = require('../models/activityModel');
const Itinerary = require('../models/itineraryModel');
const mongoose = require('mongoose');
const activityController = {};

// helper function to create activityController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `activityController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in activityController.${method}. Check server logs for more details.` }
  };
};

//Get all activities
activityController.getActivities = async (req, res, next) => {

  const { itineraryId } = req.params;

  try {
    const itinerary = await Itinerary.findOne({ _id : itineraryId });

    res.locals.activities = [];
    //loop over activity ids - to find each activity in the database
    itinerary.activities.forEach(activity => {
      Activity.findOne({ _id: activity._id })
        .then(activityDoc => {
          if (activityDoc === null) {
            return next(createErr({
              method: 'getActivities',
              type: 'ActivitiesNotFound'
            }));
          }
          res.locals.activities.push(activityDoc);
        });
    });
    
    return next();
  } catch (err) {
    return next(createErr({
      method: 'getActivities',
      type: 'activitiesGetErr',
      err
    }));
  }
};


//Create new activity, for manual input // req.body  from front end form
activityController.createActivity = async (req, res, next) => {
  // destructure request body
  const { name, date, duration, description, location } = req.body;
  const { id } = req.params;
  // add activity to db
  try {
    const newActivity = await Activity.create({ name, date, duration, description, location });
    try {
      // findOneAndUpdate for itinerary for specific session 
      const activity = await Itinerary.findOneAndUpdate({_id: id },
        // mongoose push method
        {$push: { activities: newActivity._id }},
        {new:true}
      );
      res.locals.newActivityList = activity;
      return next();
    } catch (err) {
      return next(createErr({
        method: 'addNewActivityToList',
        type: 'addNewActivityToListErr',
        err
      }));
    }
    
  } catch (err) {
    return next(createErr({
      method: 'createActivity',
      type: 'activityCreateErr',
      err
    }));
  }
  
};

//Delete activity
activityController.deleteActivity = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const activity = await Activity.findOneAndDelete({ _id: id });
      if (!activity) {
        throw new Error('falsy activity_id');
      }
      res.locals.deleted = activity;
      return next();
    } else {
      throw new Error('nonvalid activity_id');
    }

  } catch (err) {
    return next(createErr({
      method: 'deleteActivity',
      type: 'activityDeleteErr',
      err
    }));
  }
};
//Update Activity
// returns the document after update was applied
activityController.updateActivity = async (req, res, next) => {
  const { id } = req.params;
  const updatedActivity = req.body;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      if (id) {
        const activity = await Activity.findOneAndUpdate({ _id: id }, {
          ...updatedActivity
        }, {
          new: true
        });
        res.locals.updated = activity;
        return next();
      } else {
        throw new Error('falsy activity_id');
      }
    } else {
      throw new Error('nonvalid activity_id');
    }
  } catch (err) {
    return next(createErr({
      method: 'updateActivity',
      type: 'updateActivityErr',
      err
    }));
  }
};

module.exports = activityController;


// stretch
// search API <- frontend maybe
// TODO Create new activity method, from other middleware feeding in