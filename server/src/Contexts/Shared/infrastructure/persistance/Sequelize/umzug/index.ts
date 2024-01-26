/* eslint-disable import/first */
require('ts-node/register')

import { Umzug, SequelizeStorage } from 'umzug'
import { sequelize } from '../SequelizeConfig'

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta'
  }),
  logger: undefined
})

export const seeder = new Umzug({
  migrations: {
    glob: ['seeders/*.ts', { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta'
  }),
  logger: console
})

export type Migration = typeof migrator._types.migration
export type Seeder = typeof seeder._types.migration

export async function up (): Promise<void> {
  try {
    await sequelize.sync({ alter: true })
    await seeder.up()
  } catch (error) {
    console.error(error)
  }
}

export async function down (): Promise<void> {
  try {
    await seeder.down({ to: 0 })
    await sequelize.drop({})
  } catch (error) {
    console.error(error)
  }
}
