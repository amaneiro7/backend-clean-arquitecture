import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { EmployeeGetController } from '../controller/EmployeeGetController'

interface Props {
  repository: Repository
}
export const createEmployeeRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new EmployeeGetController(repository)

  router.get('/', getController.getByCriteria)

  return router
}
