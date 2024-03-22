const { Router } = require('express')

const UserController = require('../controllers/UserController')

const usersRoutes = Router()

const userController = new UserController()

usersRoutes.post('/', userController.createUser)
usersRoutes.put('/:id', userController.updatedUser)

module.exports = usersRoutes
