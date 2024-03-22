const { hash, compare } = require('bcryptjs')

const AppError = require('../utils/AppError')

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async createUser({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('This email is already in use', 400)
    }

    const hashedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    })

    return userCreated
  }

  async updatedUser({ id, name, email, password, old_password, role }) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('This email is already in use', 400)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.role = role ?? user.role

    if (password && !old_password) {
      throw new AppError('You must inform the old password', 400)
    }

    if (!password && old_password) {
      throw new AppError('You must inform the new password', 400)
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password)

      if (!checkPassword) {
        throw new AppError('The old password is incorrect', 401)
      }

      user.password = await hash(password, 8)
    }

    await this.userRepository.updatedUser({
      id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    })

    return user
  }
}

module.exports = UserService
