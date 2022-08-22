const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const passwordComplexity = require('joi-password-complexity')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWTSECRET,
        {expiresIn: '2h'}
    )
    return token
}

const User = mongoose.model("user", userSchema)

const validateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("username"),
        password: passwordComplexity().required().label('password')
    })
    return schema.validate(data)
}

module.exports = ({User, validateUser})
