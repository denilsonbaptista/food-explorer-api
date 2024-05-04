exports.up = knex =>
  knex.schema.createTable('foods', table => {
    table.increments('id')
    table.text('name').notNullable()
    table.text('price').notNullable()
    table.text('description').notNullable()
    table.integer('categories_id').references('id').inTable('categories').onDelete('CASCADE')
    table.integer('user_id').references('id').inTable('users')
    table.text('image_url').notNullable()

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

exports.down = knex => knex.schema.dropTable('foods')
