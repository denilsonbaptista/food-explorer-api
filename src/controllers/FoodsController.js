const FoodsService = require('../services/FoodsService')
const FoodsRepository = require('../repositories/FoodsRepository')
const CategoriesRepository = require('../repositories/CategoriesRepository')
const IngredientsRepository = require('../repositories/IngredientsRepository')
const SearchFoodRepository = require('../repositories/SearchFoodRepository')

class FoodsController {
  async createFood(req, res) {
    const { name, price, description, image_url, categories, ingredients } =
      req.body
    const user_id = req.user.id

    const foodsRepository = new FoodsRepository()
    const categoriesRepository = new CategoriesRepository()
    const ingredientsRepository = new IngredientsRepository()
    const foodsService = new FoodsService(
      foodsRepository,
      categoriesRepository,
      ingredientsRepository,
    )

    await foodsService.createFood({
      name,
      price,
      description,
      user_id,
      image_url,
      categories,
      ingredients,
    })

    return res.status(201).json()
  }

  async updatedFood(req, res) {
    const { name, price, description, image_url, categories, ingredients } =
      req.body
    const { id } = req.params
    const user_id = req.user.id

    const foodsRepository = new FoodsRepository()
    const categoriesRepository = new CategoriesRepository()
    const ingredientsRepository = new IngredientsRepository()
    const foodsService = new FoodsService(
      foodsRepository,
      categoriesRepository,
      ingredientsRepository,
    )

    await foodsService.updatedFood({
      food_id: id,
      user_id,
      name,
      price,
      description,
      image_url,
      categories,
      ingredients,
    })

    return res.status(200).json()
  }

  async viewFood(req, res) {
    const { id } = req.params

    const foodsRepository = new FoodsRepository()
    const foodsService = new FoodsService(foodsRepository)

    const food = await foodsService.viewFood(id)

    return res.status(200).json(food)
  }

  async deleteFood(req, res) {
    const { id } = req.params

    const foodsRepository = new FoodsRepository()
    const foodsService = new FoodsService(foodsRepository)

    await foodsService.deleteFood({ food_id: id })

    return res.status(200).json()
  }

  async indexFood(req, res) {
    const { title } = req.query

    const searchFoodRepository = new SearchFoodRepository()
    const foodsRepository = new FoodsRepository()
    const categoriesRepository = new CategoriesRepository()
    const ingredientsRepository = new IngredientsRepository()

    const foodsService = new FoodsService(
      foodsRepository,
      categoriesRepository,
      ingredientsRepository,
      searchFoodRepository,
    )

    const searchFood = await foodsService.indexFood(title)

    return res.status(200).json(searchFood)
  }
}

module.exports = FoodsController
