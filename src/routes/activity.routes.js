const express = require("express");
const Activity = require("../models/activity.model");
const Booking = require("../models/booking.model");
const auth = require("../middleware/auth.middleware");
const { validateBooking } = require("../middleware/validation.middleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - location
 *         - dateTime
 *         - capacity
 *       properties:
 *         title:
 *           type: string
 *           description: Activity title
 *         description:
 *           type: string
 *           description: Activity description
 *         location:
 *           type: string
 *           description: Activity location
 *         dateTime:
 *           type: string
 *           format: date-time
 *           description: Activity date and time
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           description: Maximum number of participants
 *         currentBookings:
 *           type: integer
 *           description: Current number of bookings
 *     Booking:
 *       type: object
 *       required:
 *         - activityId
 *       properties:
 *         activityId:
 *           type: string
 *           description: ID of the activity to book
 */

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: List all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 */
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find()
      .select("title description location dateTime capacity currentBookings")
      .sort({ dateTime: 1 });

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching activities",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/activities/book:
 *   post:
 *     summary: Book an activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Activity booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input or activity is full
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Activity not found
 */
router.post("/book", auth, validateBooking, async (req, res) => {
  try {
    const { activityId } = req.body;
    const userId = req.user._id;

    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    // Check if activity is full
    if (activity.currentBookings >= activity.capacity) {
      return res.status(400).json({
        success: false,
        message: "Activity is fully booked",
      });
    }

    // Check if user has already booked this activity
    const existingBooking = await Booking.findOne({
      user: userId,
      activity: activityId,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this activity",
      });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      activity: activityId,
    });

    await booking.save();

    // Update activity booking count
    activity.currentBookings += 1;
    await activity.save();

    res.status(201).json({
      success: true,
      message: "Activity booked successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error booking activity",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/activities/my-bookings:
 *   get:
 *     summary: Get user's bookings
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       activity:
 *                         $ref: '#/components/schemas/Activity'
 *                       status:
 *                         type: string
 *                         enum: [confirmed, cancelled]
 *       401:
 *         description: Unauthorized
 */
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("activity", "title description location dateTime")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
});

module.exports = router;
