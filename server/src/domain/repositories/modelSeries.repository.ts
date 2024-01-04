import { type CreateModelSeries, type ModelSeriesOutput, type UpdateModelSeries } from '../entities/modelSeries.entity'
import { type Repository } from './repository'

export interface ModelSeriesRepository extends Repository<ModelSeriesOutput, CreateModelSeries, UpdateModelSeries> {}
