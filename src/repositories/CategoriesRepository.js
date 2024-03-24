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

  async updatedCategory({ food_id, name }) {
    await knex('categories').where('food_id', food_id).update({ name })

    return
  }
}

module.exports = CategoriesRepository
