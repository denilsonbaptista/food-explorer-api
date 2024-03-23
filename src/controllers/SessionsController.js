const UserRepository = require('../repositories/UserRepository')
const SessionsService = require('../services/SessionsService')

class SessionsController {
  async createSession(req, res) {
    const { email, password } = req.body

    const userRepository = new UserRepository()
    const sessionsService = new SessionsService(userRepository)

    const { user, token } = await sessionsService.createSession({
      email,
      password,
    })

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000,
    })

    return res.status(200).json({ user })
  }
}

module.exports = SessionsController
