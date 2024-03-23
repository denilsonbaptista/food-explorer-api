const knex = require('../database/knex')

class CategoriesRepository {
  async createCategory({ food_id, user_id, name }) {
    await knex('categories').insert({
      food_id,
      user_id,
      name,
    })

    return
  }
}

module.exports = CategoriesRepository
