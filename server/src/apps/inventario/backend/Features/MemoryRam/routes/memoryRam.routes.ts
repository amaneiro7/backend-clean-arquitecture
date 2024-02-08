import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { MemoryRamTypeGetController } from '../controller/MemoryRamTypeGetController'

// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createMemoryRamRouter = ({ repository }: Props): Router => {
  const router = Router()
  const memoryRamTypeGetController = new MemoryRamTypeGetController(repository)

  router.get('/', memoryRamTypeGetController.getAll)

  return router
}
