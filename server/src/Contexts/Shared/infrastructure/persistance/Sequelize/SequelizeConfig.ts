import { Sequelize } from 'sequelize'
import { config } from '../../../../../../config/env.file'
import { setupModels } from './SequelizeSetupModels'

const { postgres: { dbUrl } } = config
export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: config.isProd ? console.log : false
})
function initializeDatabase (): void {
  setupModels(sequelize)

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

  sequelize.sync({ force: true }).then(() => {
    console.log('Database and tables synced')
  }).catch((error) => {
    console.error('Error syncing database:', error)
  })
}

export { initializeDatabase }
