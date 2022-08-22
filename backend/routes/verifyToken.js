const router = require("express").Router();
const {Token} = require('../models/token')
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require('joi-password-complexity');

router.post("/", async (req, res) => {
	try {
        let actuel = new Date().getTime() + 7200
		let verify = await Token.findOne({ token: req.body.token});
		if (!verify)
			return res.status(401).send({ expired: true, message: "Invalid Token" });

        if (actuel >= parseInt(verify.token)) {
            return res.status(200).send({ expired: true, message: "Expiration token delay" })
        }

		res.status(200).send({ expired: false, username: verify.username, date: verify.date, message: "Token is valid" });
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
