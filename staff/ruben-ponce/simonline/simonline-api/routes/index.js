const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createGame,
    retrieveGames,
    joinGame,
    updateCombination
} = require('./handlers')
const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.post('/games', jsonBodyParser, createGame)

router.get('/games', jwtVerifierMidWare, retrieveGames)

router.patch('/users/:id/games/:gameId', jwtVerifierMidWare, joinGame)

router.patch('/users/games/combination', [jwtVerifierMidWare, jsonBodyParser], updateCombination)

module.exports = router