const router = require('express').Router()
const { User } = require('../models/user')
const { usersList, validateNewUser } = require('../models/userList')
const bcrypt = require('bcrypt')

router.post('/', async(req, res) => {
    try {
        const {error} = validateNewUser({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const email = await usersList.findOne({ email: req.body.email })
        if (email) {
            return res.status(409).send({ message: 'User with the given email already exist.'})
        }
        const username = await User.findOne({ username: req.body.username })
        if (username) {
            return res.status(409).send({ message: "The username already exist."})
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        await usersList.create({
            username: req.body.username,
            password: hashPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            classe: req.body.classe,
            email: req.body.email,
            role: req.body.role,
            verified: req.body.verified,
        })

        await User.create({
            username: req.body.username,
            password: hashPassword,
        })

        return res.status(201).send({ message: "User created successfully"})
    } catch(error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error" })
    }
})

module.exports = router
