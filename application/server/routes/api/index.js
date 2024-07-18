const { Router } = require('express')

//const signup = require('./signup')
//const search = require('./search')

const auth = require('./auth')

const { version } = require('../../package.json')

const router = Router()


//router.use('/signup', signup)

router.get("searchUser/:searchTerm", (req, res) => {
    try {
        res.console("we are here")
    }
    catch (err) {
        console.log(err)
    }
})


router.use('/auth', auth)


router.get('/', (req, res) => {
    res.end(`API v.${version}`)
})

module.exports = router
