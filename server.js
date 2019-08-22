const express = require('express')
const bcrypt = require('bcryptjs')

const server = express()

const ApiRouter = require('./api/api-router.js')

server.use(express.json())
server.use('/api', ApiRouter)

server.get('/', (req, res) => {
    res.send('<h1>WebAuth Challenge 1</h1>')
})

module.exports = server