const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

class SessionsService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async createSession({ email, password }) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email or password', 401)
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      throw new AppError('Incorrect email or password', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    delete user.password

    return {
      user,
      token,
    }
  }
}

module.exports = SessionsService
