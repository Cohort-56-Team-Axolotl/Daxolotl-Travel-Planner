const express = require('express');
const router = express.Router();

const activityController = require('../controllers/activityController');

//GET all activities
router.get('/:itineraryId',
  activityController.getActivities,
  (req, res) => res.status(200).json(res.locals.activities)
);

//POST a new activity
router.post('/:itineraryId',
  activityController.createActivity,
  (req, res) => res.status(200).json(res.locals.newActivityList)
);

//DELETE an activity
router.delete('/:id',
  activityController.deleteActivity,
  (req, res) => res.status(200).json(res.locals.deleted)
);

//PATCH an activity
router.patch('/:id',
  activityController.updateActivity,
  (req, res) => res.status(200).json(res.locals.updated)
);

module.exports = router;