import { Sequelize } from 'sequelize'
import { config } from '../../../../../../config/env.file'
import { setupModels } from './SequelizeSetupModels'
import { up } from './umzug'

const { postgres: { dbUrl } } = config
export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: config.isProd ? console.log : false
})

export const models = setupModels(sequelize)

void (async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await up()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()
