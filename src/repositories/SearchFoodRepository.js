const knex = require('../database/knex')

class SearchFoodRepository {
  async findByCategories() {
    return await knex('*').from('categories')
  }

  async findByFoods(title) {
    return await knex('foods').where('foods.name', 'like', `%${title}%`)
  }

  async findByIngredients() {
    return await knex('*').from('ingredients')
  }

  async findByFoodsIngredients(title) {
    return await await knex('foods')
      .select(['foods.*'])
      .innerJoin('ingredients', 'foods.id', 'ingredients.food_id')
      .where('ingredients.name', 'like', `%${title}%`)
      .groupBy('foods.id')
      .orderBy('foods.name')
  }
}

module.exports = SearchFoodRepository
