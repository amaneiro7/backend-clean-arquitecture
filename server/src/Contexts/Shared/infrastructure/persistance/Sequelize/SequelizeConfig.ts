import { Sequelize } from 'sequelize'
import { config } from '../../../../../../config/env.file'
import { setupModels } from './SequelizeSetupModels'
import { InitSequelizeAssociation } from './SequelizeAssociations'

const { postgres: { dbUrl }, isProd } = config
export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

})
export function initializeDatabase (): void {
  setupModels(sequelize)
  InitSequelizeAssociation()

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

  !isProd && sequelize.sync({ alter: true }).then(() => {
    console.log('Database and tables synced')
  }).catch((error) => {
    console.error('Error syncing database:', error)
  })
}
