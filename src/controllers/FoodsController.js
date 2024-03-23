const FoodsService = require('../services/FoodsService')
const FoodsRepository = require('../repositories/FoodsRepository')
const CategoriesRepository = require('../repositories/CategoriesRepository')
const IngredientsRepository = require('../repositories/IngredientsRepository')

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
}

module.exports = FoodsController
