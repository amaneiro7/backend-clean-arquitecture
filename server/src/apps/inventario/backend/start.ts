import { type Repository } from '../../../Contexts/Shared/domain/Repository'
// import { repositoryInMemory } from '../../../Contexts/Shared/infrastructure/inMemoryRepository'
import { sequelizeRepository } from '../../../Contexts/Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

import { InventarioBackendApp } from './InventarioBackendApp'

const repository: Repository = sequelizeRepository
try {
  void new InventarioBackendApp({ repository }).start()
} catch (e) {
  console.error(e)
  process.exit(1)
}

process.on('uncaughtException', err => {
  console.error('uncaughtException', err)
  process.exit(1)
})
