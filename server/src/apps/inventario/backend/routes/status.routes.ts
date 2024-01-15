import { Router } from 'express'
import { StatusController } from '../controllers/status.controller'

export const createStatusRouter = (): Router => {
  const router = Router()
  const statusController = new StatusController()

  router.get('/', statusController.getAll)

  return router
}
