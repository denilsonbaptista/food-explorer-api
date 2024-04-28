const { Router } = require('express')

const UserController = require('../controllers/UserController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const UsersValidatedController = require('../controllers/UserValidatedController')

const usersRoutes = Router()

const userController = new UserController()
const usersValidatedController = new UsersValidatedController()

usersRoutes.post('/', userController.createUser)
usersRoutes.put('/', ensureAuthenticated, userController.updatedUser)
usersRoutes.get(
  '/validated',
  ensureAuthenticated,
  usersValidatedController.index,
)

module.exports = usersRoutes
