export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./tasks.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations"
    }
  }
};


