const { Router } = require('express')
const controller = require('./users.controller')

const router = new Router()

router.get('/', controller.list)

module.exports = router
