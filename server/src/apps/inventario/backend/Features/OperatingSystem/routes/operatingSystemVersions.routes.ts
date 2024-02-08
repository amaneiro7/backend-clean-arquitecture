import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { OperatingSystemGetController } from '../controller/OperatingSystemVersionsGetController'

interface Props {
  repository: Repository
}
export const createOperatingSystemVersionsRouter = ({ repository }: Props): Router => {
  const router = Router()
  const operatingSystemGetController = new OperatingSystemGetController(repository)

  router.get('/', operatingSystemGetController.getAll)

  return router
}
