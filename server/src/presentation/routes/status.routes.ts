import { Router } from 'express'
import { statusController } from '../../dependecies/status.dependecies'

class StatusRoutes {
  router = Router()
  constructor () {
    this.initializeRoutes()
  }

  initializeRoutes (): void {
    this.router.route('/').get(statusController.getAll.bind(statusController))
  }
}

export const statusRouter = new StatusRoutes().router
