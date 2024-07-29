const { Router } = require('express')
const signup = require('./auth')
const search = require('./search')
const post = require('./post')
const challenge = require('./challenge')
const user = require('./user')
const mentor = require('./mentor')

//const auth = require('./auth')
const { version } = require('../../package.json')

const router = Router()


//router.use('/signup', signup)
router.use('/auth', signup)
router.use('/search', search)
router.use('/post', post)
router.use('/challenge', challenge)
router.use('/user', user)
router.use('/mentor', mentor)

router.get('/', (req, res) => {
    res.end(`API v.${version}`)
})

module.exports = router