const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const usersListSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        required: true
    },
    classe: String,
    role: String,
    verified: {
        type: Boolean,
        defautl: false
    }
})


const usersList = mongoose.model("userlist", usersListSchema)

const validateNewUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("username"),
        password: passwordComplexity().required().label('password'),
        firstName: Joi.string().required().label("firstName"),
        lastName: Joi.string().required().label('lastName'),
        email: Joi.string().email().required().label('email'),
    })
    return schema.validate(data)
}

module.exports = ({usersList, validateNewUser})
