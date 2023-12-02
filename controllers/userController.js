const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// create a Json Web Token
function createToken(_id) {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

// user login
async function loginUser(req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ mssg: error.message });
	}
}

// user signup
async function signupUser(req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.signup(email, password);
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ mssg: error.message });
	}
}

module.exports = { loginUser, signupUser };
