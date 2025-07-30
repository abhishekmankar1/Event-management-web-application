const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} = require('../controllers/eventController'); // ✅ Correct path

// Public route
router.get('/', getEvents);

// Protected routes
router.post('/', auth, createEvent);
router.delete('/:id', auth, deleteEvent);
router.put('/:id', auth, updateEvent);

module.exports = router;
