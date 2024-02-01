import { type ModelSeriesPrimitives } from '../domain/ModelSeries'
import { type ModelSeriesRepository } from '../domain/ModelSeriesRepository'

const modelSeries: ModelSeriesPrimitives[] = [
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

export class InMemoryModelSeriesRepository implements ModelSeriesRepository {
  async searchAll (): Promise<ModelSeriesPrimitives[]> {
    return modelSeries
  }

  async searchById (id: string): Promise<ModelSeriesPrimitives | null> {
    return modelSeries.find(brand => brand.id === id.toString()) ?? null
  }

  async searchByName (name: string): Promise<ModelSeriesPrimitives | null> {
    return modelSeries.find(brand => brand.name.toLowerCase().trim() === String(name).toLowerCase().trim()) ?? null
  }

  async save (payload: ModelSeriesPrimitives): Promise<void> {
    const index = modelSeries.findIndex(model => model.id === payload.id)
    if (index === -1) {
      modelSeries.push(payload)
    } else {
      modelSeries[index] = payload
    }
  }

  async remove (id: string): Promise<void> {
    modelSeries.filter(brand => brand.id !== id.toString())
  }
}
