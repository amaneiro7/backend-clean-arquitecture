import { Router } from 'express'
import { StatusGetController } from '../controller/StatusGetController'

export const createStatusRouter = (): Router => {
  const router = Router()
  const statusGetController = new StatusGetController()

  router.get('/', statusGetController.getAll)

  return router
}
