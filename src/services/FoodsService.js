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

    const categories_id = await this.categoriesRepository.findCategories(
      categories,
    )

    const food = await this.foodsRepository.createFood({
      name,
      price,
      description,
      categories_id,
      user_id,
      image_url,
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
    if (
      !food_id ||
      !user_id ||
      !name ||
      !price ||
      !description ||
      !ingredients
    ) {
      throw new AppError('Missing required information', 400)
    }

    const existingFood = await this.foodsRepository.findFoodByName(name)
    if (existingFood && existingFood.id != food_id) {
      throw new AppError('Food already exists', 400)
    }

    const categories_id = await this.categoriesRepository.findCategories(
      categories,
    )

    await this.foodsRepository.updatedFood({
      food_id,
      name,
      price,
      description,
      categories_id,
      image_url,
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
    const categories = await this.searchFoodRepository.findByCategories()
    const ingredients = await this.searchFoodRepository.findByIngredients()

    let foods = await this.searchFoodRepository.findByFoods(title)

    if (foods.length <= 0) {
      foods = await this.searchFoodRepository.findByFoodsIngredients(title)
    }

    const categorizedFoods = categories.map(category => ({
      ...category,
      foods: foods
        .filter(food => food.categories_id === category.id)
        .map(food => ({
          ...food,
          ingredients: ingredients.filter(
            ingredient => ingredient.food_id === food.id,
          ),
        })),
    }))

    return categorizedFoods
  }
}

module.exports = FoodsService
