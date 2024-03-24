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

  async updatedFood({ food_id: id, name, price, description, image_url }) {
    await knex('foods').where('id', id).update({
      name,
      price,
      description,
      image_url,
    })

    return
  }

  async findFoodByName(name) {
    const foodName = await knex('foods').where('name', name).first()

    return foodName
  }

  async viewFood(food_id) {
    const food = await knex('foods').where('foods.id', food_id)
    const category = await knex('categories').where('food_id', food_id)
    const ingredients = await knex('ingredients').where('food_id', food_id)

    return {
      ...food,
      category,
      ingredients,
    }
  }

  async deleteFood({ food_id: id }) {
    await knex('foods').where('id', id).del()

    return
  }
}

module.exports = FoodsRepository
