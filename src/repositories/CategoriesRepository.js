const knex = require('../database/knex')

class CategoriesRepository {
  async createCategory({ user_id, name }) {
    const [category_id] = await knex('categories').insert({
      user_id,
      name,
    })

    return category_id
  }

  // async updatedCategory({ id, food_id }) {
  //   await knex('categories').where('id', id).update({ food_id })

  //   return
  // }

  async findCategories(categories) {
    const { id } = await knex('categories').where('name', categories).first()

    return id
  }

  async searchCategories(title) {
    return await knex('categories').where('name', 'like', `%${title}%`)
  }
}

module.exports = CategoriesRepository
