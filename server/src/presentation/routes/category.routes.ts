import { Router } from 'express'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { getIdDTO } from '../validators/dto'
import { CategoryController } from '../controllers/category.controller'
import { type Repository } from '../../domain/repositories/respoitory'

export const createCategoryRouter = (repository: Repository): Router => {
  const router = Router()

  const categoryController = new CategoryController(repository)

  router.get('/', categoryController.getAll)

  router.get('/:id',
    validatorParamsHandler(getIdDTO),
    categoryController.getOne
  )

  return router
}
