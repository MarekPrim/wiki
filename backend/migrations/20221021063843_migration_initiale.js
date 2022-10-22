exports.up = function(knex) {

    return knex.schema
        .createTable('pages', table => {
            table.string('id').unique().primary()
            table.text('markdown').notNullable()
            table.string('author')
        })
}

exports.down = function(knex) {
    return knex.schema
        .dropTable('pages')
}