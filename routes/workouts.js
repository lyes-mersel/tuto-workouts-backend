const express = require("express");

// middlewares
const requireAuth = require("../middlewares/requireAuth")

// controller functions
const {
	getAllWorkouts,
	getOneWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// require auth for all workouts routes
router.use(requireAuth);

// GET all the workouts
router.get("/", getAllWorkouts);

// GET a single workout
router.get("/:id", getOneWorkout);

// POST a single workout
router.post("/", createWorkout);

// DELETE a single workout
router.delete("/:id", deleteWorkout);

// UPDATE a single workout
router.patch("/:id", updateWorkout);

module.exports = router;
