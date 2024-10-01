import { Router } from 'express'
import { DashboardGetController } from '../controller/DashboardGetController'
import { type Repository } from '../../../../../Contexts/Shared/domain/Repository'
// import { validatorHandler } from '../../middleware/validatorHandler'

interface Props {
  repository: Repository
}
export const createDashboardRouter = ({ repository }: Props): Router => {
  const router = Router()
  const getController = new DashboardGetController(repository)

  router.get('/', getController.dashboard)
  router.get('/bycategory', getController.countByCategory)
  router.get('/byoperatingsystem', getController.countByOperatingSystem)
  router.get('/totaldevices', getController.totalDevice)


  return router
}
