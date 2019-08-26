const express = require('express')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

const ApiRouter = require('./api/api-router.js')

const sessionOptions = {
    name: 'sessionCookie',
    secret: 'CooookieMonster',
    cookie: {
        maxAge: 1000*60*60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
        knex: require('./data/db-config.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInternal: 1000*60*60
    })
}
const server = express()

server.use(express.json())
server.use(session(sessionOptions))
server.use('/api', ApiRouter)

server.get('/', (req, res) => {
    res.send('<h1>WebAuth Challenge 1+2</h1>')
})

module.exports = server