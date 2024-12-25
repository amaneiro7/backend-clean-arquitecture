import { CacheRepository } from '../../../Contexts/Shared/domain/CacheRepository'
import { type Repository } from '../../../Contexts/Shared/domain/Repository'
import { RedisRepository } from '../../../Contexts/Shared/infrastructure/persistance/Redis/RedisRepository'
// import { repositoryInMemory } from '../../../Contexts/Shared/infrastructure/inMemoryRepository'
import { sequelizeRepository } from '../../../Contexts/Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

import { InventarioBackendApp } from './InventarioBackendApp'

(async () => {
  try {
    const cache: CacheRepository = new RedisRepository();
    const repository: Repository = await sequelizeRepository(cache)
    void new InventarioBackendApp({ repository }).start()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()

process.on('uncaughtException', err => {
  console.error('uncaughtException', err)
  process.exit(1)
})
