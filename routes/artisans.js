const express = require('express');

const router = express.Router();

const artisansController = require('../controllers/artisans');

/**
 * @swagger
 * /artisans:
 *   get:
 *     summary: Get all artisans
 *     tags: [Artisans]
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
 *     tags: [Artisans]
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
 *     tags: [Artisans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - service
 *               - location
 *               - experience
 *               - available
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               service:
 *                 type: string
 *               location:
 *                 type: string
 *               experience:
 *                 type: integer
 *               available:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Artisan created successfully
 */
router.post('/', artisansController.createArtisan);

/**
 * @swagger
 * /artisans/{id}:
 *   put:
 *     summary: Update artisan
 *     tags: [Artisans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - service
 *               - location
 *               - experience
 *               - available
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               service:
 *                 type: string
 *               location:
 *                 type: string
 *               experience:
 *                 type: integer
 *               available:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: Artisan updated successfully
 */
router.put('/:id', artisansController.updateArtisan);

/**
 * @swagger
 * /artisans/{id}:
 *   delete:
 *     summary: Delete artisan
 *     tags: [Artisans]
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