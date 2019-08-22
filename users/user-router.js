const express = require('express')
const Users = require('./user-model.js')

const router = express.Router()

router.get('/', (req, res) => {
    Users.getUsers()
})

module.exports = router