const { Router } = require('express')
const controller = require('./user.controller')

const router = new Router()

router.post('/', controller.create)
router.get('/:id', controller.show)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
