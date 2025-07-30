const Event = require('../models/Event');

// GET all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE event
const createEvent = async (req, res) => {
  try {
    const { title, date, description, imageUrl, tags } = req.body;
    const newEvent = new Event({ title, date, description, imageUrl, tags });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// DELETE event
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

// UPDATE event
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event' });
  }
};

module.exports = {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
};
