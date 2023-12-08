const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// signup static method
userSchema.statics.signup = async function (email, password) {
	// validations
	if (!email || !password) {
		throw Error("All fiels must be filled");
	}
	if (!validator.isEmail(email)) {
		throw Error("Email is not valid");
	}
	if (!validator.isStrongPassword(password)) {
		throw Error(
			"Your password must be at least 8 characters long and contain a combination of uppercase and lowercase letters, numbers, and special characters."
		);
	}

	// check if the email is already in use
	const userExists = await this.findOne({ email: email });
	if (userExists) {
		throw Error("Email already in use !");
	}

	// hashing
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = await this.create({ email: email, password: hash });

	return user;
};

// login static method
userSchema.statics.login = async function (email, password) {
	// validation
	if (!email || !password) {
		throw Error("All fiels must be filled");
	}

	// check if the user exists
	const user = await this.findOne({ email: email });
	if (!user) {
		// incorrect email address
		throw Error("Incorrect login credentials !");
	}

	// compare the password with the hash
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		// incorrect password
		throw Error("Incorrect login credentials !");
	}

	return user;
};

module.exports = mongoose.model("User", userSchema);
