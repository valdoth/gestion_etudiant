require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db.js')
const createUserRoutes = require('./routes/createUser')
const authRoutes = require('./routes/login')
const getList = require('./routes/getList')
const verifyToken = require('./routes/verifyToken')

connection()

app.use(express.json())
app.use(cors())

app.use('/api/signup', createUserRoutes)
app.use('/api/signin', authRoutes)
app.use('/api/list', getList)
app.use('/api/verifyTokenExpiration', verifyToken)

const port = process.env.PORT || 8000
app.listen(port, () => console.log('Listen on port ' + port))

