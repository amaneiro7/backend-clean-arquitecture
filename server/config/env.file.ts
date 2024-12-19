/* eslint-disable no-prototype-builtins */
// import 'dotenv/config'
import dotenv from 'dotenv'

const envs: Record<string, string> = {
  production: '.env.prod',
  development: '.env.dev',
  e2e: '.env.e2e'
}

const {
  NODE_ENV: env = 'development'
} = process.env


const options = {
  path: envs[env]
}
dotenv.config(options)

const {
  PORT: port = 3000,
  POSTGRES_USER: postgresUser = 'postgres',
  POSTGRES_PASSWORD: postgresPassword = 'Man12345*',
  POSTGRES_HOST: postgresHost = 'localhost',
  POSTGRES_PORT: postgresPort = 5432,
  POSTGRES_DB_NAME: postgresDBName = 'inventoryApp',
  REDIS_HOST: redisHost = 'localhost',
  REDIS_PORT: redisPort = 6379,
  REDIS_PASSWORD: redisPassword = 'Man12345*',
  SIGNED_COOKIE_SECRET: signedCookie = 'signed_cookie_secret',
  ACCESS_TOKEN_SECRET: accessTokenSecret = 'access_token_scret',
  REFRESH_TOKEN_SECRET: refreshTokenSecret = 'refresh_token_scret',
  SMTP_EMAIL: smtpEmail = 'jaasnavas0811@gmail.com',
  SMTP_PASSWORD: smtpPassword = 'vldpmrrvdvcnrjdx'
} = process.env

export const config = {
  env,
  isProd: env === 'production',
  baseApiUrl: '/api/v2',
  port,
  postgres: {
    user: postgresUser,
    password: postgresPassword,
    host: postgresHost,
    port: postgresPort,
    dbName: postgresDBName,
  },
  redis: {
    host: redisHost,
    port: Number(redisPort),
    password: redisPassword,
  },
  signedCookie,
  accessTokenSecret,
  refreshTokenSecret,
  smtpEmail,
  smtpPassword
}

