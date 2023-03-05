const Activity = require('../models/activityModel');
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




//Create new activity, for manual input // req.body  from front end form
activityController.createActivity = async (req, res, next) => {
  // destructure request body
  const { name, date, time, duration, description, location } = req.body;
  // add activity to db
  try {
    const activity = await Activity.create({ name, date, time, duration, description, location });
    res.locals.newActivity = activity;
    return next();
  } catch (err) {
    return next(createErr({
      method: 'createActivity',
      type: 'activityCreateErr',
      err
    }));
  }
};

//Delete activity
activityController.deleteActivity = async (req, res, next) {
  const { id } = req.params.activity;

  if (mongoose.Types.ObjectId.isValid(id)) {
    return
  }
  // Activity.deleteOne({})
  const activity = await Activity.findOneAndDelete({ _id: id });

  if (!activity) {

  }
}
//Update Activity

module.exports = activityController;


// stretch
// search API <- frontend maybe
// TODO Create new activity method, from other middleware feeding in