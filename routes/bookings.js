const express = require('express');

const router = express.Router();

const bookingsController = require('../controllers/bookings');

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
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
router.get('/:id', bookingsController.getSingle);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create booking
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', bookingsController.createBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Booking updated
 */
router.put('/:id', bookingsController.updateBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted
 */
router.delete('/:id', bookingsController.deleteBooking);

module.exports = router;