exports.up = knex =>
  knex.schema.createTable('categories', table => {
    table.increments('id')
    table
      .integer('food_id')
      .references('id')
      .inTable('foods')
      .onDelete('CASCADE')
    table.integer('user_id').references('id').inTable('users')
    table.text('name').notNullable()
  })

exports.down = knex => knex.schema.dropTable('categories')
