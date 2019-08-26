const express = require('express')
const Users = require('./user-model.js')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/users', authenticate, async (req, res) => {
    const users = await Users.getUsers()
    res.status(200).json(users)
})

router.post('/register', async (req, res) => {
    let user = req.body
    const hashedPW = bcrypt.hashSync(user.password, 10)
    user.password = hashedPW

    try {
        const newUser = await Users.registerUser(user)
        res.status(201).json(newUser)
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Register User", error: error })
    }
})

router.post('/login', async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await Users.getUserByUsername(username)
        if(user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id
            res.status(200).json({ message: "Logged in"})
        } else {
            res.status(400).json({ message: "You shall not pass!"})
        }
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Log In", error: error })
    }
})

//middlewares

async function authenticate( req, res, next ) {
    const {username, password} = req.headers
    if(username && password) {
        try {
            const user = await Users.getUserByUsername(username)
            if(user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({ message: "You shall not pass!"})
            }
        }
        catch(error) {
         res.status(500).json({ message: "Authentication Error"})
        }
    } else {
        res.status(400).json({ message: "no credentials provided" })
    }
    
}

module.exports = router