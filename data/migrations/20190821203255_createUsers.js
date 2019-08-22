
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.string('username').notNullable
      tbl.stringkn('password').notNullable
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
