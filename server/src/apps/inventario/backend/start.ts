import { type Repository } from '../../../Contexts/Shared/domain/Repository'
import { repositoryInMemory } from '../../../Contexts/Shared/infrastructure/inMemoryRepository'

import { InventarioBackendApp } from './InventarioBackendApp'

const repository: Repository = repositoryInMemory
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
