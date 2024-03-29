const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class FoodsImagesController {
  async update(req, res) {
    const user_id = req.user.id
    const food_id = req.params.id
    const foodFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex('users').where({ id: user_id }).first()
    const food = await knex('foods').where({ id: food_id }).first()

    if (!user) {
      throw new AppError('Only authenticated user can change avata', 401)
    }

    if (!food) {
      throw new AppError('Food not found', 404)
    }

    if (food.image_url) {
      await diskStorage.deleteFile(food.image_url)
    }

    const filename = await diskStorage.saveFile(foodFilename)
    food.image_url = filename

    await knex('foods').update(food).where({ id: food_id })

    return res.json(food)
  }
}

module.exports = FoodsImagesController
