import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('quotes', table => {
    table.increments('id').primary();
    table.string('content').notNullable();
    table.string('author').notNullable().defaultTo('Unknown');
    table.string('complement').notNullable().defaultTo('Unknown');
    table.integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('quotes');
}