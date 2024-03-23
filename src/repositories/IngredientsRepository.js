const knex = require('../database/knex')

class IngredientsRepository {
  async createIngredients(ingredientsInsert) {
    await knex('ingredients').insert(ingredientsInsert)

    return
  }
}

module.exports = IngredientsRepository
