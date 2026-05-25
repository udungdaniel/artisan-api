const express = require('express');

const router = express.Router();

const artisansController = require('../controllers/artisans');

/**
 * @swagger
 * /artisans:
 *   get:
 *     summary: Get all artisans
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', artisansController.getAll);

/**
 * @swagger
 * /artisans/{id}:
 *   get:
 *     summary: Get single artisan
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', artisansController.getSingle);

/**
 * @swagger
 * /artisans:
 *   post:
 *     summary: Create artisan
 *     responses:
 *       201:
 *         description: Artisan created
 */
router.post('/', artisansController.createArtisan);

/**
 * @swagger
 * /artisans/{id}:
 *   put:
 *     summary: Update artisan
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Artisan updated
 */
router.put('/:id', artisansController.updateArtisan);

/**
 * @swagger
 * /artisans/{id}:
 *   delete:
 *     summary: Delete artisan
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artisan deleted
 */
router.delete('/:id', artisansController.deleteArtisan);

module.exports = router;