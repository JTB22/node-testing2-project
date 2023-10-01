/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("rooms", (table) => {
    table.increments("id").primary();
    table.integer("floor", 1).notNullable();
    table.integer("beds", 1).notNullable();
    table.boolean("vacant").notNullable();
    table.integer("pin", 6).unique().notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("rooms");
};
