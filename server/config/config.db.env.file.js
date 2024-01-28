const { configDotenv } = require('dotenv');

require('dotenv').config();

const env = process.env.NODE_ENV ?? 'development'
const envs = {
    production: '.env.prod',
    development: '.env.dev',
    e2e: '.env.e2e',
}

const options = {}

if(envs.hasOwnProperty(env)) {
    options.path = envs[env]
}

console.log(env);

configDotenv(options)

const config = {
    env,
  isProd: process.env.NODE_ENV === 'production',
  baseApiUrl: '/api/v2',
  port: process.env.PORT ?? 3000,
  postgres: {
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASS ?? 'Man12345*',
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: process.env.POSTGRES_PORT ?? 5432,
    dbName: process.env.POSTGRES_DB_NAME ?? 'inventoryApp',
    dbUrl: process.env.POSTGRES_URI ?? 'postgres://postgres:Man12345*@localhost:5432/inventoryApp'
    // dbUrl: process.env.POSTGRES_URI ?? 'postgres://e2e:e2e123@localhost:5433/db_e2e'
  },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET ?? 'access_token_scret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? 'refresh_token_scret',
  smtpEmail: process.env.SMTP_EMAIL ?? 'jaasnavas0811@gmail.com',
  smtpPassword: process.env.SMTP_PASSWORD ?? 'vldpmrrvdvcnrjdx'
}

module.exports = { config }