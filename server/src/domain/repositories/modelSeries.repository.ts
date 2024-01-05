import { type CreateModelSeries, type ModelSeriesOutput, type UpdateModelSeries } from '../entities/modelSeries.entity'
import { type GenericRepository } from './GenericRepository'

export interface ModelSeriesRepository extends GenericRepository<ModelSeriesOutput, CreateModelSeries, UpdateModelSeries> {}
