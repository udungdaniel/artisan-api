const express = require('express');

const router = express.Router();

const artisansController = require('../controllers/artisans');

router.get('/', artisansController.getAll);

router.get('/:id', artisansController.getSingle);

router.post('/', artisansController.createArtisan);

router.put('/:id', artisansController.updateArtisan);

router.delete('/:id', artisansController.deleteArtisan);

module.exports = router;