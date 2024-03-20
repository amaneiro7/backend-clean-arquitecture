import { type Repository } from '../../../Contexts/Shared/domain/Repository'
<<<<<<< HEAD
=======
// import { repositoryInMemory } from '../../../Contexts/Shared/infrastructure/inMemoryRepository'
>>>>>>> 2ff2c0bdba40f55abfbf24b4ccc07c1059862a80
import { sequelizeRepository } from '../../../Contexts/Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

import { InventarioBackendApp } from './InventarioBackendApp'

const repository: Repository = sequelizeRepository
try {
  void new InventarioBackendApp({ repository }).start()
} catch (e) {
  console.log(e)
  process.exit(1)
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
