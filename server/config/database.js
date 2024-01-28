const { config } = require('./config.db.env.file')
module.exports = {
    "development": {
    "username": config.postgres.user,
    "password": config.postgres.password,
    "database": config.postgres.dbName,
    "host": config.postgres.host,
    "dialect": "postgres",    
    "seederStorage": "json",    
    "seederStoragePath": "sequelizeData.json",    
    "seederStorageTableName": "sequelize_data"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
