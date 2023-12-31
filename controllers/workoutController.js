const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

// get all workouts
getAllWorkouts = async (req, res) => {
	const user_id = req.user._id;
	const workouts = await Workout.find({ user_id })
		.sort({ createdAt: -1 })
		.then((workouts) => res.status(200).json(workouts))
		.catch((error) => res.status(400).json({ error: error.message }));
};

// get one workout
getOneWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout !" });
	}

	await Workout.findById(id)
		.then((workout) => {
			if (!workout) {
				res.status(400).json({ error: "No such workout !" });
			} else {
				res.status(200).json(workout);
			}
		})
		.catch((error) => res.status(200).json({ error: error.message }));
};

// create a new workout
createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;
	let emptyFields = [];

	if (!title) {
		emptyFields.push("title");
	}
	if (!reps) {
		emptyFields.push("reps");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all the fields !", emptyFields });
	}

	const user_id = req.user._id;
	await Workout.create({ title, reps, load, user_id })
		.then((workout) => res.status(200).json(workout))
		.catch((error) => res.status(400).json({ error: error.message }));
};

// delete a workout
deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout !" });
	}

	await Workout.findByIdAndDelete(id)
		.then((workout) => {
			if (!workout) {
				res.status(400).json({ error: "No such workout !" });
			} else {
				res.status(200).json(workout);
			}
		})
		.catch((error) => res.status(200).json({ error: error.message }));
};

// update a workout
updateWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout !" });
	}

	await Workout.findByIdAndUpdate(id, { ...req.body })
		.then((workout) => {
			if (!workout) {
				res.status(400).json({ error: "No such workout !" });
			} else {
				res.status(200).json(workout);
			}
		})
		.catch((error) => res.status(200).json({ error: error.message }));
};

module.exports = {
	getOneWorkout,
	getAllWorkouts,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
