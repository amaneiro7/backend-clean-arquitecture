import { ModelSeriesService } from '../application/services/modelSeries.service'
import { modelRepositoryInMemory } from '../infrastructure/persistance/local-file-system/modelSeries'

export const modelSeriesService = new ModelSeriesService(modelRepositoryInMemory)
