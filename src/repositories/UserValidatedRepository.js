const knex = require('../database/knex')

class ValidatedRepository {
  async checkUserExists({ id }) {
    const user = await knex('users').where({ id })

    return user
  }
}

module.exports = ValidatedRepository
