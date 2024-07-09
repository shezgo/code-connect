const { Router } = require('express')
const signup = require('./auth')
const { version } = require('../../package.json')

const router = Router()

router.use('/auth', signup)

router.get('/', (req, res) => {
  res.end(`API v.${ version }`)
})

module.exports = router
