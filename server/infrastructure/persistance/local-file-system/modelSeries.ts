import { randomUUID } from 'node:crypto'
import { type Id } from '../../../types/types'
import { type UpdateModelSeries, type ModelSeries, type CreateModelSeries } from '../../../domain/entities/modelSeries.entity'
import { type ModelSeriesRepository } from '../../../domain/repositories/modelSeries.repository'
import { brandService } from '../../../dependecies/brand.dependecies'
import { categoryService } from '../../../dependecies/category.dependecies'
import { type Brand } from '../../../domain/entities/brand.entity'
import { type Category } from '../../../domain/entities/category.entity'

const modelSeries: ModelSeries[] = [
  {
    id: '5c6dc78f-3591-44ec-bb72-7d5dbd46737d',
    name: 'm71e',
    categoryId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
    brandId: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'
  },
  {
    id: '6c195b0e-9885-4073-a3bd-7ff906e4cf30',
    name: 'm72e',
    categoryId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
    brandId: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'
  },
  {
    id: 'd3237ea9-2e2b-438b-a3d3-954a3ffae5f7',
    name: 'HP Compaq Pro 6300 SFF',
    categoryId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
    brandId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3'
  },
  {
    id: 'd696340e-cc33-4320-be42-e58554f4bf51',
    name: 'HP Compaq Pro 6000 SFF',
    categoryId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
    brandId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3'
  },
  {
    id: 'd696340e-cc33-4320-be42-e58554f4bf51',
    name: 'LV 1710',
    categoryId: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
    brandId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3'
  }
]

export interface Output {
  id: Id
  name: string
  brandId: Brand
  categoryId: Category
}
export class ModelSeriesRepositoryInMemory implements ModelSeriesRepository {
  getAll = async (): Promise<Output[]> => {
    const data = await this.dataFormatter(modelSeries)
    return data
  }

  dataFormatter = async (array: ModelSeries[]): Promise<Output[]> => {
    const data: Output[] = []
    await Promise.all(array.map(async (model) => {
      const dataFormatting = await this.joinRelationalTables(model)
      data.push(dataFormatting)
    }))
    return data
  }

  joinRelationalTables = async (model: ModelSeries): Promise<Output> => {
    const category = await categoryService.getOne({ id: model.categoryId })
    const brand = await brandService.getOne({ id: model.brandId })
    if (category === undefined || brand === undefined) {
      throw new Error('Error interno')
    }
    return {
      ...model,
      categoryId: category,
      brandId: brand
    }
  }

  getOne = async ({ id }: { id: Id }): Promise<Output | undefined> => {
    const modelSerie = modelSeries.find(modelSerie => modelSerie.id === id)
    if (modelSerie === undefined) {
      throw new Error('Error interno')
    }
    return await this.joinRelationalTables(modelSerie)
  }

  create = async (payload: CreateModelSeries): Promise <ModelSeries> => {
    const newModelSerie = {
      id: randomUUID(),
      ...payload
    }
    modelSeries.push(newModelSerie)
    return newModelSerie
  }

  update = async (id: Id, payload: UpdateModelSeries): Promise<ModelSeries | undefined> => {
    const modelSerieIndex = modelSeries.findIndex(modelSerie => modelSerie.id === id)
    if (modelSerieIndex === -1) return undefined
    modelSeries[modelSerieIndex] = {
      ...modelSeries[modelSerieIndex],
      ...payload
    }

    return modelSeries[modelSerieIndex]
  }
}
