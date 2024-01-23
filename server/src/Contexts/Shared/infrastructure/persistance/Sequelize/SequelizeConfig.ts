import { Sequelize } from 'sequelize'
import { config } from '../../../../../../config/env.file'

export const sequelize = new Sequelize(config.postgres.dbUrl, {
  dialect: 'postgres',
  logging: config.isProd ? console.log : false
})
