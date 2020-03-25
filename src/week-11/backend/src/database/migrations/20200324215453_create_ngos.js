
exports.up = function(knex) {
  return knex.schema.createTable('NGOs', function(table) {
    table.string('Id').primary();
    table.string('Name').notNullable();
    table.string('Email').notNullable();
    table.string('Whatsapp').notNullable();
    table.string('City').notNullable();
    table.string('State', 2).notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('NGOs')
};
