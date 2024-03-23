const { Router } = require('express')

const UserController = require('../controllers/UserController')
const userController = new UserController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router()

usersRoutes.post('/', userController.createUser)
usersRoutes.put('/', ensureAuthenticated, userController.updatedUser)

module.exports = usersRoutes
