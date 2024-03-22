const { Router } = require('express')

const UserController = require('../controllers/UserController')

const usersRouter = Router()

const userController = new UserController()

usersRouter.post('/', userController.createUser)
usersRouter.put('/:id', userController.updatedUser)

module.exports = usersRouter
