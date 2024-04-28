import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { EmployeeGetController } from '../controller/EmployeeGetController'
import { EmployeePostController } from '../controller/EmployeePostController'

interface Props {
  repository: Repository
}
export const createEmployeeRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new EmployeeGetController(repository)
  const postController = new EmployeePostController(repository)

  router.get('/', getController.getByCriteria)
  router.get('/all', getController.getAll)
  router.get('/:id', getController.getById)
  router.post('/', postController.create)
  router.patch('/:id', postController.update)
  router.delete('/:id', postController.remove)

  return router
}
