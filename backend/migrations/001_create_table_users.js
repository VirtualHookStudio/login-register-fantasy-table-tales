/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('validate').notNullable()
        table.boolean('permission').notNullable()
        table.string('name').notNullable().unique()
        table.string('email').notNullable().unique()
        table.string('phone').notNullable().unique()
        table.string('user_icon')
        table.string('description')
        table.string('password').notNullable()
        table.integer('country_id').notNullable()
        table.timestamp('created_at').notNullable()
        table.timestamp('deleted_at')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
