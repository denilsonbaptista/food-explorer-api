const knex = require('../database/knex')

class UserRepository {
  async createUser({ name, email, password }) {
    const [id] = await knex('users').insert({ name, email, password })

    return { id }
  }

  async updatedUser({ id, name, email, password, role }) {
    await knex('users')
      .where({ id })
      .update({ name, email, password, role, updated_at: knex.fn.now() })

    return
  }

  async findById(id) {
    const user = await knex('users').where('id', id).first()

    return user
  }

  async findByEmail(email) {
    const userEmail = await knex('users').where('email', email).first()

    return userEmail
  }
}

module.exports = UserRepository
