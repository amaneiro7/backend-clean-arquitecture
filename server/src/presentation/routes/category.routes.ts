import { Router } from 'express'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { getIdDTO } from '../validators/dto'
import { CategoryController } from '../controllers/category.controller'
import { type Repository } from '../../domain/repositories/respoitory'

export const createCategoryRouter = (repository: Repository): Router => {
  const router = Router()

  const categoryController = new CategoryController(repository)

  router.get('/', categoryController.getAll)

  return router
}
// class CategoryRoutes {
//   router = Router()

//   constructor () {
//     this.initializeRoutes()
//   }

//   initializeRoutes (): void {
//     this.router.route('/').get(categoryController.getAll.bind(categoryController))
//     this.router.route('/:id').get(
//       validatorParamsHandler(getIdDTO),
//       categoryController.getOne.bind(categoryController))
//   }
// }

// export const categoryRouter = new CategoryRoutes().router
