import { type Id } from '../../types/types'
import { type Brand } from './brand.entity'
import { type Category } from './category.entity'

export interface ModelSeries {
  id: Id
  name: string
  brandId: Id
  categoryId: Id
}

export interface ModelSeriesOutout {
  id: Id
  name: string
  categoryId: Category
  brandId: Brand
}

export interface CreateModelSeries extends Omit<ModelSeries, 'id'> {}
export interface UpdateModelSeries extends Partial<CreateModelSeries> {}
