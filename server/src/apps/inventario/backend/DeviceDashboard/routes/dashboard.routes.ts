import { Router } from 'express'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
import { DashboardGetController } from '../controller/DashboardGetController'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createDashboardRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new DashboardGetController(repository)

  router.get('/bycategory', getController.countByCategory)
  router.get('/totaldevices', getController.totalDevice)


  return router
}
