const router = require("express").Router();
const { User, validateUser } = require("../models/user");
const {Token} = require('../models/token')
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require('joi-password-complexity');

router.post("/", async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error)
			return res.status(400).send({ message: error });

		const user = await User.findOne({ username: req.body.username });
		if (!user)
			return res.status(401).send({ message: "Invalid Username or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" });
		const token = user.generateAuthToken();

		date = String(Math.floor(Date.now() / 1000) + 7200)

		await Token.create({
			username: user.username,
			token,
			date
		})

		res.status(200).send({ username: user.username, token, date, message: "logged in successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('username'),
        password: passwordComplexity().required().label('password')
    })
    return schema.validate(data)
}

module.exports = router;
