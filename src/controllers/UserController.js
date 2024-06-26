const UserRepository = require('../repositories/UserRepository')
const UserService = require('../services/UserService')

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    await userService.createUser({ name, email, password })

    return res.status(201).json()
  }

  async updatedUser(req, res) {
    const { name, email, password, old_password, role } = req.body
    const user_id = req.user.id

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    await userService.updatedUser({
      id: user_id,
      name,
      email,
      password,
      old_password,
      role,
    })

    return res.status(200).json()
  }
}

module.exports = UserController
