require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const corsConfig = require("./middlewares/corsConfig");
const requireAuth = require("./middlewares/requireAuth");

const rootRouter = require("./routes/rout");
const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workouts");


// express app
const app = express();

// static folder
app.use(express.static('public'));

// middlewares
app.use(corsConfig);
app.use(express.json());

// routes
app.use("/", rootRouter);
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