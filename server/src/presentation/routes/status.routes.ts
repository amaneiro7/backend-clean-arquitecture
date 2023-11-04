import { Router } from 'express'
import { statusController } from '../../dependecies/status.dependecies'

export const statusRouter = Router()

statusRouter.get('/', statusController.getAll.bind(statusController))
