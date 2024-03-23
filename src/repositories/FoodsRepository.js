const knex = require('../database/knex')

class FoodsRepository {
  async createFood({ name, price, description, user_id, image_url }) {
    const [food_id] = await knex('foods').insert({
      name,
      price,
      description,
      user_id,
      image_url,
    })

    return food_id
  }

  async findFoodByName(name) {
    const foodName = await knex('foods').where('name', name).first()

    return foodName
  }
}

module.exports = FoodsRepository
