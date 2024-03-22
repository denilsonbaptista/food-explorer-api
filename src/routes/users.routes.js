const { Router } = require('express')

const UserController = require('../controllers/UserController')
const userController = new UserController()

const usersRoutes = Router()

usersRoutes.post('/', userController.createUser)
usersRoutes.put('/:id', userController.updatedUser)

module.exports = usersRoutes
