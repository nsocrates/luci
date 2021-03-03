const { Router } = require('express')
const user = require('./user')
const users = require('./users')
const router = new Router()

router.use('/user', user)
router.use('/users', users)

module.exports = router
