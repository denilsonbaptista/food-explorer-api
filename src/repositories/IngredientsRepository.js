const knex = require('../database/knex')

class IngredientsRepository {
  async createIngredients(ingredientsInsert) {
    await knex('ingredients').insert(ingredientsInsert)

    return
  }

  async findByFoodId(food_id) {
    const ingredients = await knex('ingredients').where('food_id', food_id)

    return ingredients
  }

  async deleteByFoodId(food_id) {
    await knex('ingredients').where('food_id', food_id).del()

    return
  }
}

module.exports = IngredientsRepository
