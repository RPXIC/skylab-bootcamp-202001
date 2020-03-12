require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const startGame = require('./start-game')
const { mongoose } = require('simonline-data')
// mongoose.set('useFindAndModify', false)

/* Insert players, shuffle, and current */

describe('startGame', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let name, owner, username, password

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
        name = `name-${random()}`
        owner = username
    })

    describe('when user and game already exists', () => {
        let gameId
        
        beforeEach(async() => {
            let users = []
            /* 10 players and one game */
            for (let i = 0; i < 10; i++)
                await User.create({ username, password })
                    .then(user => users.push(user.id))

                return Game.create({ name, owner })
                .then(game => {
                    for (let i = 0; i < users.length; i++)
                        game.players.push(users[i])
                    
                    return game.save()
                })
        })

        it('should succeed on valid data', () => {

            return startGame(gameId)
                .then(() =>
                    Game.findOne({ name, owner })
                )
                .then(game => {
                    expect(game).to.exist
                    expect(game.name).to.equal(name)
                    expect(game.owner).to.equal(owner)
                    expect(game.status).to.equal("started")

                })
        })

        afterEach(() => {
            Game.deleteOne({ gameId })
            User.deleteOne({ username })
        })

    })

    after(() => mongoose.disconnect())
})