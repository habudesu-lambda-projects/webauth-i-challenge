const express = require('express')
const bcrypt = require('bcryptjs')

const server = express()

const UserRouter = require('./users/user-router.js')

server.use(express.json())
server.use('/api/users', UserRouter)

server.get('/', (req, res) => {
    res.send('<h1>WebAuth Challenge 1</h1>')
})

module.exports = router