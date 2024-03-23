const { verify } = require('jsonwebtoken')

const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers

  if (!authHeader.cookie) {
    throw new AppError('No token provided', 401)
  }

  const [, token] = authHeader.cookie.split('token=')

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(user_id),
    }
  } catch {
    throw new AppError('Invalid token', 401)
  }

  return next()
}

module.exports = ensureAuthenticated
