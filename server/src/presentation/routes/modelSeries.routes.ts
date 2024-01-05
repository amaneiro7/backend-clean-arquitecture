import { Router } from 'express'
import { type Repository } from '../../domain/repositories/respoitory'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { createModelSeriesDTO, getIdDTO, updateModelSeriesDTO } from '../validators/dto'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { ModelSeriesController } from '../controllers/modelSeries.controller'

export const createModelSeriesRouter = (repository: Repository): Router => {
  const router = Router()

  const modelSeriesController = new ModelSeriesController(repository)

  router.get('/', modelSeriesController.getAll)
  // router.post('/',
  //   validatorBodyHandler(createDTO),
  //   modelSeriesController.create)

  router.get('/:id',
    validatorParamsHandler(getIdDTO),
    modelSeriesController.getOne
  )

  return router
}
// class ModelSeriesRoutes {
//   router = Router()
//   constructor () {
//     this.initializeRoutes()
//   }

//   initializeRoutes (): void {
//     this.router.route('/').get(modelSeriesController.getAll.bind(modelSeriesController))
//     this.router.route('/').post(
//       validatorBodyHandler(createModelSeriesDTO),
//       modelSeriesController.create.bind(modelSeriesController)
//     )
//     this.router.route('/:id').get(
//       validatorParamsHandler(getIdDTO),
//       modelSeriesController.getOne.bind(modelSeriesController)
//     )
//     this.router.route('/:id').patch(
//       validatorParamsHandler(getIdDTO),
//       validatorBodyHandler(updateModelSeriesDTO),
//       modelSeriesController.update.bind(modelSeriesController)
//     )
//   }
// }

// export const modelSeriesRouter = new ModelSeriesRoutes().router
