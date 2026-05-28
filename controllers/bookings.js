const mongodb = require('../mongodb');
const { ObjectId } = require('mongodb');

// GET ALL BOOKINGS
const getAll = async (req, res) => {
  try {

    const db = await mongodb.initDb();

    const result = await db.collection('bookings').find();

    const bookings = await result.toArray();

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// GET SINGLE BOOKING
const getSingle = async (req, res) => {
  try {

    // VALIDATE ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid booking ID'
      });
    }

    const bookingId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const result = await db
      .collection('bookings')
      .find({ _id: bookingId });

    const booking = await result.toArray();

    if (!booking.length) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(booking[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {

    const {
      customerName,
      customerPhone,
      artisanId,
      serviceDate,
      status
    } = req.body;

    // VALIDATION
    if (
      !customerName ||
      !customerPhone ||
      !artisanId ||
      !serviceDate ||
      !status
    ) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const booking = {
      customerName,
      customerPhone,
      artisanId,
      serviceDate,
      status
    };

    const db = await mongodb.initDb();

    const response = await db
      .collection('bookings')
      .insertOne(booking);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Booking created successfully',
        id: response.insertedId
      });
    } else {
      res.status(500).json({
        message: 'Failed to create booking'
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// UPDATE BOOKING
const updateBooking = async (req, res) => {
  try {

    // VALIDATE ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid booking ID'
      });
    }

    const bookingId = new ObjectId(req.params.id);

    const {
      customerName,
      customerPhone,
      artisanId,
      serviceDate,
      status
    } = req.body;

    // VALIDATION
    if (
      !customerName ||
      !customerPhone ||
      !artisanId ||
      !serviceDate ||
      !status
    ) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const booking = {
      customerName,
      customerPhone,
      artisanId,
      serviceDate,
      status
    };

    const db = await mongodb.initDb();

    const response = await db.collection('bookings').replaceOne(
      { _id: bookingId },
      booking
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: 'Failed to update booking'
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// DELETE BOOKING
const deleteBooking = async (req, res) => {
  try {

    // VALIDATE ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid booking ID'
      });
    }

    const bookingId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const response = await db.collection('bookings').deleteOne({
      _id: bookingId
    });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: 'Booking deleted successfully'
      });
    } else {
      res.status(500).json({
        message: 'Failed to delete booking'
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBooking,
  updateBooking,
  deleteBooking
};