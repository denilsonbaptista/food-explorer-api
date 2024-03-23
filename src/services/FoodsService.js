const AppError = require('../utils/AppError')

class FoodsService {
  constructor(foodsRepository, categoriesRepository, ingredientsRepository) {
    this.foodsRepository = foodsRepository
    this.categoriesRepository = categoriesRepository
    this.ingredientsRepository = ingredientsRepository
  }

  async createFood({
    name,
    price,
    description,
    user_id,
    image_url,
    categories,
    ingredients,
  }) {
    const foodName = await this.foodsRepository.findFoodByName(name)

    if (foodName) {
      throw new AppError('Food already exists', 400)
    }

    const food = await this.foodsRepository.createFood({
      name,
      price,
      description,
      user_id,
      image_url,
    })

    await this.categoriesRepository.createCategory({
      food_id: food,
      user_id,
      name: categories,
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        food_id: food,
        user_id,
        name: ingredient,
      }
    })

    await this.ingredientsRepository.createIngredients(ingredientsInsert)

    return
  }
}

module.exports = FoodsService
