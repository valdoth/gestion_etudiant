const router = require("express").Router();
const { usersList } = require('../models/userList')

router.get("/", async (req, res) => {
	try {
		const data = await usersList.find({})
		res.status(200).send({ data, message: "logged in successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
