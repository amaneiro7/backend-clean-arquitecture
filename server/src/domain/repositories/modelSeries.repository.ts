import { type CreateModelSeries, type ModelSeriesOutput, type UpdateModelSeries } from '../entities/Device/modelSeries.entity'
import { type GenericRepository } from './GenericRepository'

export interface ModelSeriesRepository extends GenericRepository<ModelSeriesOutput, CreateModelSeries, UpdateModelSeries> {}
