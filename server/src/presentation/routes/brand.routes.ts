/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
// import { validatorHandler } from '../../middleware/validatorHandler'
import { createDTO, getIdDTO, updateDTO } from '../validators/dto'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { brandController } from '../controllers/brand.controller'

class BrandRoutes {
  router = Router()

  constructor () {
    this.initializeRoutes()
  }

  initializeRoutes (): void {
    this.router.route('/')
      .get(brandController.getAll.bind(brandController))
      .post(
        validatorBodyHandler(createDTO),
        brandController.create.bind(brandController)
      )

    this.router.route('/:id')
      .get(
        validatorParamsHandler(getIdDTO),
        brandController.getOne.bind(brandController)
      )
      .patch(
        validatorParamsHandler(getIdDTO),
        validatorBodyHandler(updateDTO),
        brandController.update.bind(brandController)
      )
  }
}

export const brandRouter = new BrandRoutes().router
