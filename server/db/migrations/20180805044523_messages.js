exports.up = knex =>
  knex.schema.createTable('messages', table => {
    table.increments();
    table.string('message').notNullable();
    table.timestamp('created_at');
  });

exports.down = knex => knex.schema.dropTable('messages');
