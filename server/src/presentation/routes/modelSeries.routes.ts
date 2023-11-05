import { Router } from 'express'
import { modelSeriesController } from '../../dependecies/modelSeries.dependecies'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { createModelSeriesDTO, getIdDTO, updateModelSeriesDTO } from '../validators/dto'
import validatorBodyHandler from '../validators/validatorBodyHandler'

class ModelSeriesRoutes {
  router = Router()
  constructor () {
    this.initializeRoutes()
  }

  initializeRoutes (): void {
    this.router.route('/').get(modelSeriesController.getAll.bind(modelSeriesController))
    this.router.route('/').post(
      validatorBodyHandler(createModelSeriesDTO),
      modelSeriesController.create.bind(modelSeriesController)
    )
    this.router.route('/:id').get(
      validatorParamsHandler(getIdDTO),
      modelSeriesController.getOne.bind(modelSeriesController)
    )
    this.router.route('/:id').patch(
      validatorParamsHandler(getIdDTO),
      validatorBodyHandler(updateModelSeriesDTO),
      modelSeriesController.update.bind(modelSeriesController)
    )
  }
}

export const modelSeriesRouter = new ModelSeriesRoutes().router
