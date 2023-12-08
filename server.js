require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const corsConfig = require("./middlewares/corsConfig");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(corsConfig);
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		dbName: "DB",
	})
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log(
				"Server connected to DB & listening on port : " + process.env.PORT
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = app;