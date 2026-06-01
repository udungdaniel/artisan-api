const express = require('express');
const auth = require('../middleware/authenticate');

const router = express.Router();

const artisansController = require('../controllers/artisans');

/**
 * @swagger
 * tags:
 *   name: Artisans
 *   description: Artisan management routes
 */

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
 *       404:
 *         description: Artisan not found
 */
router.get('/:id', artisansController.getSingle);

/**
 * @swagger
 * /artisans:
 *   post:
 *     summary: Create artisan
 *     tags: [Artisans]
 *     security:
 *       - oauth2: []
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
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  auth.isAuthenticated,
  artisansController.createArtisan
);

/**
 * @swagger
 * /artisans/{id}:
 *   put:
 *     summary: Update artisan
 *     tags: [Artisans]
 *     security:
 *       - oauth2: []
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
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/:id',
  auth.isAuthenticated,
  artisansController.updateArtisan
);

/**
 * @swagger
 * /artisans/{id}:
 *   delete:
 *     summary: Delete artisan
 *     tags: [Artisans]
 *     security:
 *       - oauth2: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artisan deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/:id',
  auth.isAuthenticated,
  artisansController.deleteArtisan
);

module.exports = router;