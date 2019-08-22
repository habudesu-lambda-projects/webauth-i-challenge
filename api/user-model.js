const db = require('../data/db-config.js')

module.exports = {
    getUsers,
    getUserByUsername,
    registerUser
}

function getUsers() {
    return db('users')
}

function getUserByUsername(username) {
    return db('users').where({username}).first()
}

function registerUser(user) {
    return db('users').insert(user)
}