
exports.up = function(knex) {
    return knex.schema.createTable('Incidents', function(table) {
      table.increments();
      table.string('Title').notNullable();
      table.string('Description').notNullable();
      table.decimal('Value').notNullable();

      table.string('NGO_Id')
      table.foreign('NGO_id').references('Id').inTable('NGOs');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Incidents')
  };
  