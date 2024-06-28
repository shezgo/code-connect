const { Router } = require('express')
const signup = require('./signup')
const { version } = require('../../package.json')

const router = Router()

router.use('/signup', signup)

router.get('/', (req, res) => {
  res.end(`API v.${ version }`)
})

module.exports = router
