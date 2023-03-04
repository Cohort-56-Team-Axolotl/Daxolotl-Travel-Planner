const express = require('express');
const router = express.Router();

const itineraryController = require('../controllers/itineraryController');


// //GET all itineraries for specific user
// router.get('/all/:userid',
//   itineraryController.getItineraries,
//   (req, res) => res.status(200).json(res.locals.itineraries)
// );

// //GET a single itinerary for a specific user
// router.get('/:itineraryid',
//   itineraryController.getItinerary,
//   (req, res) => res.status(200).json(res.locals.itinerary)
// );

// //POST a new itinerary
// router.post('/:itineraryid', 
//   itineraryController.createItinerary,
//   (req, res) => res.status(200).json(res.locals.newItinerary)
// );

// //DELETE a new itinerary
// router.delete('/:itineraryid',
//   itineraryController.deleteItinerary,
//   (req, res) => res.status(200).json(res.locals.deleted)
// );

// //PATCH a new itinerary
// router.patch('/:itineraryid',
//   itineraryController.updateItinerary,
//   (req, res) => res.status(200).json(res.locals.updated)
// );

module.exports = router;