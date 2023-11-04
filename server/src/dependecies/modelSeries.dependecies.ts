import { ModelSeriesService } from '../application/services/modelSeries.service'
import { ModelSeriesRepositoryInMemory } from '../infrastructure/persistance/local-file-system/modelSeries'
import { ModelSeriesController } from '../presentation/controllers/modelSeries.controller'

const modelSeriesRepository = new ModelSeriesRepositoryInMemory()

export const modelSeriesService = new ModelSeriesService(modelSeriesRepository)

export const modelSeriesController = new ModelSeriesController(modelSeriesService)
