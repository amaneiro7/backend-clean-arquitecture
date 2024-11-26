require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DBNAME,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    migrationStorage: "sequelize",
    migrationStorageTableName: "sequelize_migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "postgres",
    "password": "$0p0rT3*.*",
    "database": "inventoryApp_prod",
    "host": "localhost",
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "migrationStorageTableName": "sequelize_migrations",
    "seederStorage": "sequelize",
    "seederStorageTableName": "sequelize_data"
  }
}
