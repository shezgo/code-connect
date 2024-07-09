const { Router } = require('express')
const signup = require('./signup')
const search = require('./search')
const { version } = require('../../package.json')

const router = Router()

router.use('/signup', signup)
router.use('/search', search)

router.get('/', (req, res) => {
  res.end(`API v.${ version }`)
})

module.exports = router
