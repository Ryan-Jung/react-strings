exports.up = knex =>
  knex.schema.createTable('messages', table => {
    table.increments();
    table.string('message').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('messages');
