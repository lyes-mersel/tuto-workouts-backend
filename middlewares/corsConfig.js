const cors = require("cors");

const corsOptions = {
	origin: "https://tuto-workout.vercel.app",
	optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);