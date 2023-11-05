import { Router } from 'express'
import { categoryController } from '../../dependecies/category.dependecies'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { getIdDTO } from '../validators/dto'

class CategoryRoutes {
  router = Router()

  constructor () {
    this.initializeRoutes()
  }

  initializeRoutes (): void {
    this.router.route('/').get(categoryController.getAll.bind(categoryController))
    this.router.route('/:id').get(
      validatorParamsHandler(getIdDTO),
      categoryController.getOne.bind(categoryController))
  }
}

export const categoryRouter = new CategoryRoutes().router
