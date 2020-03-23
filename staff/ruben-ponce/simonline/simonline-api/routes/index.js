const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createGame,
    retrieveGames,
    joinGame,
    updateCombination,
    startGame,
    retrieveGameStatus,
    playCombination,
    retrievePlayersName
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

router.patch('/users/:id/games/:gameId', [jwtVerifierMidWare, jsonBodyParser], joinGame)

router.patch('/users/games/combination', [jwtVerifierMidWare, jsonBodyParser], updateCombination)

router.patch('/users/games/:gameId/start', [jwtVerifierMidWare, jsonBodyParser], startGame)

router.patch('/users/games/:gameId/retrieve', [jwtVerifierMidWare, jsonBodyParser], retrieveGameStatus)

router.patch('/users/games/playcombination', [jwtVerifierMidWare, jsonBodyParser], playCombination)

router.get('/users/games/:gameId/players', jwtVerifierMidWare, retrievePlayersName)

module.exports = router