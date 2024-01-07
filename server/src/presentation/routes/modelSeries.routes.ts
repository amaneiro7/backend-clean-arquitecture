import { Router } from 'express'
import { type Repository } from '../../domain/repositories/respoitory'
import { validatorParamsHandler } from '../validators/validatorParamsHandler'
import { createModelSeriesDTO, getIdDTO, updateModelSeriesDTO } from '../validators/dto'
import validatorBodyHandler from '../validators/validatorBodyHandler'
import { ModelSeriesController } from '../controllers/modelSeries.controller'

interface Props {
  repository: Repository
}

export const createModelSeriesRouter = ({ repository }: Props): Router => {
  const router = Router()

  const modelSeriesController = new ModelSeriesController(repository)

  router.get('/', modelSeriesController.getAll)
  router.post('/',
    validatorBodyHandler(createModelSeriesDTO),
    modelSeriesController.create)

  router.get('/:id',
    validatorParamsHandler(getIdDTO),
    modelSeriesController.getOne
  )
  router.patch('/:id',
    validatorParamsHandler(getIdDTO),
    validatorBodyHandler(updateModelSeriesDTO),
    modelSeriesController.update
  )

  return router
}
