const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')

const tokenSchema = new mongoose.Schema({
    token: String,
    date: String,
    username: String
})

const Token = mongoose.model("token", tokenSchema)

module.exports = ({Token})
