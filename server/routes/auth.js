const router = require("express").Router();
const { User } = require("../models/usermodule");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

			const token = user.jwt;
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

// Google OAuth Login Route
router.post("/google", async (req, res) => {
	try {
		const { OAuth2Client } = require('google-auth-library');
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
		
		const { credential } = req.body;
		
		// Verify the Google token
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		
		const payload = ticket.getPayload();
		const { sub: googleId, email, given_name, family_name, picture } = payload;
		
		// Check if user exists
		let user = await User.findOne({ email });
		
		if (user) {
			// User exists - update Google info if not already set
			if (!user.googleId) {
				user.googleId = googleId;
				user.picture = picture;
				user.authProvider = 'google';
				await user.save();
			}
		} else {
			// Create new user
			user = new User({
				firstName: given_name || 'User',
				lastName: family_name || '',
				email,
				googleId,
				picture,
				authProvider: 'google',
			});
			await user.save();
		}
		
		// Generate JWT token
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "Logged in successfully with Google" });
		
	} catch (error) {
		console.error("Google OAuth Error:", error);
		res.status(500).send({ message: "Google authentication failed" });
	}
});


module.exports = router;

