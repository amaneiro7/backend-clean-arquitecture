import { Sequelize } from 'sequelize'
import { config } from '../../../../../../config/env.file'

const { postgres: { dbUrl } } = config
export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: config.isProd ? console.log : false
})

void (async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()
