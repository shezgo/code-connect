const { Router } = require('express')
<<<<<<< HEAD
const signup = require('./signup')
const search = require('./search')
=======
const signup = require('./auth')
>>>>>>> shez-backend-dev
const { version } = require('../../package.json')

const router = Router()

<<<<<<< HEAD
router.use('/signup', signup)
router.use('/search', search)
=======
router.use('/auth', signup)
>>>>>>> shez-backend-dev

router.get('/', (req, res) => {
  res.end(`API v.${ version }`)
})

module.exports = router
