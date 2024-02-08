import { Router } from 'express'
import { type Repository } from '../../../../../../Contexts/Shared/domain/Repository'
import { OperatingSystemArqGetController } from '../controller/OperatingSystemArqGetController'

interface Props {
  repository: Repository
}
export const createOperatingSystemArqRouter = ({ repository }: Props): Router => {
  const router = Router()
  const operatingSystemArqGetController = new OperatingSystemArqGetController(repository)

  router.get('/', operatingSystemArqGetController.getAll)

  return router
}
