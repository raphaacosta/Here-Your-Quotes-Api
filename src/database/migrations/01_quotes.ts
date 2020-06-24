import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('quotes', table => {
    table.increments('id').primary();
    table.string('content').notNullable();
    table.string('author').notNullable();
    table.string('source').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('quotes');
}