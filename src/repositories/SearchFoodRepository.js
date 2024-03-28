const knex = require('../database/knex')

class SearchFoodRepository {
  async findFoodName(title) {
    const foodName = await knex('foods').where('name', 'like', `%${title}%`)

    return foodName
  }

  async findFoodIngredientsName(title) {
    const foodIngredients = await knex('ingredients').where(
      'name',
      'like',
      `%${title}%`,
    )

    return foodIngredients
  }

  async findIngredientsFoodId(foodIds) {
    const ingredients = await knex('ingredients').whereIn('food_id', foodIds)

    return ingredients
  }

  async searchFoodName(title) {
    const searchFoodName = await knex('foods')
      .where('name', 'like', `%${title}%`)
      .orderBy('name')

    return searchFoodName
  }

  async searchFoodIngredients(title) {
    const searchFoodIngredients = await knex('foods')
      .select(['foods.*'])
      .innerJoin('ingredients', 'foods.id', 'ingredients.food_id')
      .where('ingredients.name', 'like', `%${title}%`)
      .groupBy('foods.id')
      .orderBy('foods.name')

    return searchFoodIngredients
  }
}

module.exports = SearchFoodRepository
