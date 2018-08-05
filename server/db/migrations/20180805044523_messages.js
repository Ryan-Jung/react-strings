
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
      table.increments(),
      table.string('message'),
      table.timestamps()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages')
};
