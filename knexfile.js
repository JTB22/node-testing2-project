// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const common = {
  client: "sqlite3",
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  useNullAsDefault: true,
};
module.exports = {
  development: {
    ...common,
    connection: {
      filename: "./dev.sqlite3",
    },
  },

  testing: {
    ...common,
    connection: {
      filename: "./test.sqlite3",
    },
  },
};
