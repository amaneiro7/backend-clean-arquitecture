/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
// import { validatorHandler } from '../../middleware/validatorHandler'
import { createDTO, getIdDTO, updateDTO } from '../validators/dto'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { BrandController } from '../controllers/brand.controller'
import { type Repository } from '../../domain/repositories/respoitory'

export const createBrandRouter = (repository: Repository): Router => {
  const router = Router()
  const brandController = new BrandController(repository)

  router.get('/', brandController.getAll)
  // router.post('/',
  //   validatorBodyHandler(createDTO),
  //   brandController.create)

  return router
}

// class BrandRoutes {
//   router = Router()

//   constructor () {
//     this.initializeRoutes()
//   }

//   initializeRoutes (): void {
//     this.router.route('/')
//       .get(brandController.getAll.bind(brandController))
//       .post(
//         validatorBodyHandler(createDTO),
//         brandController.create.bind(brandController)
//       )

//     this.router.route('/:id')
//       .get(
//         validatorParamsHandler(getIdDTO),
//         brandController.getOne.bind(brandController)
//       )
//       .patch(
//         validatorParamsHandler(getIdDTO),
//         validatorBodyHandler(updateDTO),
//         brandController.update.bind(brandController)
//       )
//   }
// }

// export const brandRouter = new BrandRoutes().router
