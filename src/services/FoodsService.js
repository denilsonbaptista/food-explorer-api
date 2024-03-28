const AppError = require('../utils/AppError')

class FoodsService {
  constructor(
    foodsRepository,
    categoriesRepository,
    ingredientsRepository,
    searchFoodRepository,
  ) {
    this.foodsRepository = foodsRepository
    this.categoriesRepository = categoriesRepository
    this.ingredientsRepository = ingredientsRepository
    this.searchFoodRepository = searchFoodRepository
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

  async updatedFood({
    food_id,
    user_id,
    name,
    price,
    description,
    image_url,
    categories,
    ingredients,
  }) {
    const food = await this.foodsRepository.findFoodByName(name)

    if (food && food.id != food_id) {
      throw new AppError('Food already exists', 400)
    }

    await this.foodsRepository.updatedFood({
      food_id,
      name,
      price,
      description,
      image_url,
    })

    await this.categoriesRepository.updatedCategory({
      food_id,
      name: categories,
    })

    await this.ingredientsRepository.deleteByFoodId(food_id)

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        food_id,
        user_id,
        name: ingredient,
      }
    })

    await this.ingredientsRepository.createIngredients(ingredientsInsert)

    return
  }

  async viewFood(food_id) {
    const food = await this.foodsRepository.viewFood(food_id)

    return food
  }

  async deleteFood({ food_id }) {
    await this.foodsRepository.deleteFood({ food_id })

    return
  }

  async indexFood(title) {
    const foodName = await this.searchFoodRepository.findFoodName(title)
    const foodIngredients =
      await this.searchFoodRepository.findFoodIngredientsName(title)

    let food

    if (foodName && foodName.length > 0) {
      food = await this.searchFoodRepository.searchFoodName(title)
    } else if (foodIngredients && foodIngredients.length > 0) {
      food = await this.searchFoodRepository.searchFoodIngredients(title)
    } else {
      throw new AppError('No food found', 400)
    }

    const foodIds = food.map(food => food.id)

    const ingredients = await this.searchFoodRepository.findIngredientsFoodId(
      foodIds,
    )
    const foodWithIngredients = food.map(food => {
      const foodIngredients = ingredients.filter(
        ingredient => ingredient.food_id === food.id,
      )

      return {
        ...food,
        ingredients: foodIngredients,
      }
    })

    return foodWithIngredients
  }
}

module.exports = FoodsService
