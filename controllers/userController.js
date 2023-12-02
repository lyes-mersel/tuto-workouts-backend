const mongoose = require("mongoose");
const User = require("../models/userModel");

// user login
function loginUser(req, res) {
	res.json({ mssg: "User login" });
}

// user signup
function signupUser(req, res) {
	res.json({ mssg: "User signup" });
}

module.exports = { loginUser, signupUser };
