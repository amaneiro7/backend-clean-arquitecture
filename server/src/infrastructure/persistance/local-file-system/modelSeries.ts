import { randomUUID } from 'node:crypto'
import { type Id } from '../../../types/types'
import { type UpdateModelSeries, type ModelSeries, type CreateModelSeries, type ModelSeriesOutput } from '../../../domain/entities/modelSeries.entity'
import { type ModelSeriesRepository } from '../../../domain/repositories/modelSeries.repository'
import { repositoryInMemory } from '.'

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
    id: 'd696340e-cc33-4320-be42-e58554f4bf58',
    name: 'LV 1710',
    categoryId: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
    brandId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3'
  },
  {
    id: '9f95946f-be67-4ea5-bcef-86ce115618cc',
    name: 'HightPrint 4915xe',
    categoryId: '5ad1a235-0d9c-410a-b32b-220d91689a08',
    brandId: '5ad1a235-0d9c-410a-b32b-220d91689a08'
  },
  {
    id: '01a9328f-2554-4a5e-8c88-3375e3a1d88c',
    name: 'HightPrint 4915+',
    categoryId: '5ad1a235-0d9c-410a-b32b-220d91689a08',
    brandId: '5ad1a235-0d9c-410a-b32b-220d91689a08'
  },
  {
    id: 'e3d95984-c747-4acf-b29f-46d1f2dd23aa',
    name: 'LaserJet P2015dn',
    categoryId: '241bf55d-b649-4109-af7c-0e6890ded3fc',
    brandId: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3'
  }
]

export class ModelSeriesRepositoryImpl implements ModelSeriesRepository {
  async getAll (): Promise<ModelSeriesOutput[]> {
    return await this.dataFormatter(modelSeries)
  }

  async getById (id: Id): Promise<ModelSeriesOutput | undefined> {
    const modelSerie = modelSeries.find(modelSerie => modelSerie.id === id)
    if (modelSerie !== undefined) {
      return await this.joinRelationalTables(modelSerie)
    }
    return modelSerie
  }

  async getByName (name: string): Promise<ModelSeriesOutput | undefined> {
    const modelSerie = modelSeries.find(modelSerie => modelSerie.name.toLowerCase().trim() === name.toLowerCase().trim())
    if (modelSerie !== undefined) {
      return await this.joinRelationalTables(modelSerie)
    }
    return modelSerie
  }

  async create (payload: CreateModelSeries): Promise<ModelSeriesOutput> {
    const newModelSeries = {
      id: randomUUID(),
      ...payload
    }
    modelSeries.push(newModelSeries)
    return await this.joinRelationalTables(newModelSeries)
  }

  async update (id: `${string}-${string}-${string}-${string}-${string}`, payload: UpdateModelSeries): Promise<ModelSeriesOutput | undefined> {
    const modelSeriesIndex = modelSeries.findIndex(modelSeries => modelSeries.id === id)
    if (modelSeriesIndex === -1) return undefined
    modelSeries[modelSeriesIndex] = {
      ...modelSeries[modelSeriesIndex],
      ...payload
    }
    return await this.joinRelationalTables(modelSeries[modelSeriesIndex])
  }

  async remove (id: `${string}-${string}-${string}-${string}-${string}`): Promise<void> {
    modelSeries.filter(modelSerie => modelSerie.id !== id)
  }

  dataFormatter = async (array: ModelSeries[]): Promise<ModelSeriesOutput[]> => {
    const data: ModelSeriesOutput[] = []
    await Promise.all(array.map(async (model) => {
      const dataFormatting = await this.joinRelationalTables(model)
      data.push(dataFormatting)
    }))
    return data
  }

  joinRelationalTables = async (model: ModelSeries): Promise<ModelSeriesOutput> => {
    const category = await repositoryInMemory.category.getById(model.categoryId)
    const brand = await repositoryInMemory.brand.getById(model.brandId)
    if (category === undefined || brand === undefined) {
      throw new Error('Error interno')
    }
    const data = {
      ...model,
      category,
      brand
    }
    const { categoryId, brandId, ...result } = data
    return result
  }
}
