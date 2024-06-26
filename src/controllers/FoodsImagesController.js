const knex = require('../database/knex')
// const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class FoodsImagesController {
  async create(req, res) {
    // const user_id = req.user.id
    const foodFilename = req.file.filename

    const diskStorage = new DiskStorage()

    // const user = await knex('users').where({ id: user_id }).first()

    // if (!user) {
    //   throw new AppError('Only authenticated user can change avata', 401)
    // }

    // if (food.image_url && food.image_url !== foodFilename) {
    //   await diskStorage.deleteFile(food.image_url)
    // }

    const filename = await diskStorage.saveFile(foodFilename)

    return res.json({
      image_url: filename,
    })
  }

  async update(req, res) {
    const { id } = req.params
    const foodFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const food = await knex('foods').where({ id }).first()

    if (food.image_url && food.image_url !== foodFilename) {
      await diskStorage.deleteFile(food.image_url)
    }

    const filename = await diskStorage.saveFile(foodFilename)

    return res.json({
      image_url: filename,
    })
  }
}

module.exports = FoodsImagesController
