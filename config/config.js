// https://sequelize.org/docs/v6/other-topics/migrations/#dynamic-configuration

require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_DB_USER_NAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DEFAULT_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT || 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.PRODUCTION_DB_USER_NAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_DEFAULT_DATABASE,
    host: process.env.PRODUCTION_DB_HOST,
    port: process.env.PRODUCTION_DB_PORT || 3306,
    dialect: 'mysql',
  },
}