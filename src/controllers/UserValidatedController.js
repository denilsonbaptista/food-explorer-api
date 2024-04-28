const ValidatedRepository = require('../repositories/UserValidatedRepository')
const AppError = require('../utils/AppError')

class UsersValidatedController {
  async index(req, res) {
    const { user } = req

    const validatedRepository = new ValidatedRepository()

    const userExists = await validatedRepository.checkUserExists({
      id: user.id,
    })

    if (userExists.length === 0) {
      throw new AppError('Unauthorized', 401)
    }

    return res.status(200).json()
  }
}

module.exports = UsersValidatedController
