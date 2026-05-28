const mongodb = require('../mongodb');
const { ObjectId } = require('mongodb');

// GET ALL ARTISANS
const getAll = async (req, res) => {
  try {
    const db = await mongodb.initDb();

    const result = await db.collection('artisans').find();

    const artisans = await result.toArray();

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(artisans);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// GET SINGLE ARTISAN
const getSingle = async (req, res) => {
  try {

    // VALIDATE ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid artisan ID'
      });
    }

    const artisanId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const result = await db
      .collection('artisans')
      .find({ _id: artisanId });

    const artisan = await result.toArray();

    if (!artisan.length) {
      return res.status(404).json({
        message: 'Artisan not found'
      });
    }

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json(artisan[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// CREATE ARTISAN
const createArtisan = async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      location,
      experience,
      available
    } = req.body;

    // VALIDATION
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !service ||
      !location ||
      experience === undefined ||
      available === undefined
    ) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const artisan = {
      firstName,
      lastName,
      email,
      phone,
      service,
      location,
      experience,
      available
    };

    const db = await mongodb.initDb();

    const response = await db
      .collection('artisans')
      .insertOne(artisan);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Artisan created successfully',
        id: response.insertedId
      });
    } else {
      res.status(500).json({
        message: 'Failed to create artisan'
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// UPDATE ARTISAN
const updateArtisan = async (req, res) => {
  try {

    // VALIDATE ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid artisan ID'
      });
    }

    const artisanId = new ObjectId(req.params.id);

    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      location,
      experience,
      available
    } = req.body;

    // VALIDATION
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !service ||
      !location ||
      experience === undefined ||
      available === undefined
    ) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const artisan = {
      firstName,
      lastName,
      email,
      phone,
      service,
      location,
      experience,
      available
    };

    const db = await mongodb.initDb();

    const response = await db.collection('artisans').replaceOne(
      { _id: artisanId },
      artisan
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: 'Failed to update artisan'
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// DELETE ARTISAN
const deleteArtisan = async (req, res) => {
  try {

    // VALIDATE ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid artisan ID'
      });
    }

    const artisanId = new ObjectId(req.params.id);

    const db = await mongodb.initDb();

    const response = await db.collection('artisans').deleteOne({
      _id: artisanId
    });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: 'Artisan deleted successfully'
      });
    } else {
      res.status(500).json({
        message: 'Failed to delete artisan'
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
  createArtisan,
  updateArtisan,
  deleteArtisan
};