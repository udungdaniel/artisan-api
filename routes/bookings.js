const express = require('express');
const auth = require('../middleware/authenticate');

const router = express.Router();

const bookingsController = require('../controllers/bookings');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management routes
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', bookingsController.getAll);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get single booking
 *     tags: [Bookings]
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
 *         description: Booking not found
 */
router.get('/:id', bookingsController.getSingle);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create booking
 *     tags: [Bookings]
 *     security:
 *       - oauth2: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - customerPhone
 *               - artisanId
 *               - serviceDate
 *               - status
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               artisanId:
 *                 type: string
 *               serviceDate:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  auth.isAuthenticated,
  bookingsController.createBooking
);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update booking
 *     tags: [Bookings]
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
 *               - customerName
 *               - customerPhone
 *               - artisanId
 *               - serviceDate
 *               - status
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               artisanId:
 *                 type: string
 *               serviceDate:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       204:
 *         description: Booking updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/:id',
  auth.isAuthenticated,
  bookingsController.updateBooking
);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
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
 *         description: Booking deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/:id',
  auth.isAuthenticated,
  bookingsController.deleteBooking
);

module.exports = router;