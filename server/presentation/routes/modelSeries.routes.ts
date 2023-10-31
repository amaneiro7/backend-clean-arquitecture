import { Router } from 'express'
import { modelSeriesController } from '../../dependecies/modelSeries.dependecies'

export const modelSeriesRouter = Router()

modelSeriesRouter.get('/', modelSeriesController.getAll.bind(modelSeriesController))
modelSeriesRouter.post('/', modelSeriesController.create.bind(modelSeriesController))

modelSeriesRouter.get('/:id', modelSeriesController.getOne.bind(modelSeriesController))
modelSeriesRouter.patch('/:id', modelSeriesController.update.bind(modelSeriesController))
