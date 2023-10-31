// import 'dotenv/config'
import dotenv from 'dotenv'

interface Options {
    path?: string
}

interface Environments {
    [key: string]: string
}

const env = process.env.NODE_ENV || 'dev'
const envs: Environments = {
    dev: '.env',
    e2e: '.env.e2e'
}

const options: Options = {}

if (envs.hasOwnProperty(env)) {    
    options.path = envs[env]
}

dotenv.config(options)

export const config = {
    env,
    isProd: process.env.NODE_ENV === 'production',
    baseApiUrl: '/api/v2',
    port: process.env.PORT || 3000,
    postgres: {
        user: process.env.POSTGRES_USER || 'appadmin',
        password: process.env.POSTGRES_PASS || 'Man12345.',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
        dbName: process.env.POSTGRES_DB_NAME || 'inventoryApp',
        // dbUrl: process.env.POSTGRES_URI || 'postgres://appadmin:Man12345.@localhost:5432/inventoryApp'
        dbUrl: process.env.POSTGRES_URI || 'postgres://e2e:e2e123@localhost:5433/db_e2e'
    },
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'access_token_scret',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refresh_token_scret'
}
// console.log('[CONFIG]', config);