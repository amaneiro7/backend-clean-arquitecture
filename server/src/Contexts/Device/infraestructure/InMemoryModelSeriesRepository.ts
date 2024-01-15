import { BrandId } from '../../Brand/domain/BrandId'
import { CategoryId } from '../../Category/domain/CategoryId'
import { ModelSeries } from '../domain/Device'
import { ModelSeriesId } from '../domain/DeviceId'
import { ModelSeriesName } from '../domain/DeviceName'
import { type ModelSeriesRepository } from '../domain/DeviceRepository'

const modelSeries: ModelSeries[] = [
  new ModelSeries(
    new ModelSeriesId('5c6dc78f-3591-44ec-bb72-7d5dbd46737d'),
    new ModelSeriesName('m71e'),
    new CategoryId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'),
    new BrandId('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf')
  ),
  new ModelSeries(
    new ModelSeriesId('6c195b0e-9885-4073-a3bd-7ff906e4cf30'),
    new ModelSeriesName('m72e'),
    new CategoryId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'),
    new BrandId('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf')
  ),
  new ModelSeries(
    new ModelSeriesId('d3237ea9-2e2b-438b-a3d3-954a3ffae5f7'),
    new ModelSeriesName('HP Compaq Pro 6300 SFF'),
    new CategoryId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'),
    new BrandId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3')
  ),
  new ModelSeries(
    new ModelSeriesId('d696340e-cc33-4320-be42-e58554f4bf51'),
    new ModelSeriesName('HP Compaq Pro 6000 SFF'),
    new CategoryId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'),
    new BrandId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3')
  ),
  new ModelSeries(
    new ModelSeriesId('d696340e-cc33-4320-be42-e58554f4bf58'),
    new ModelSeriesName('LV 1710'),
    new CategoryId('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'),
    new BrandId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3')
  ),
  new ModelSeries(
    new ModelSeriesId('9f95946f-be67-4ea5-bcef-86ce115618cc'),
    new ModelSeriesName('HightPrint 4915xe'),
    new CategoryId('5ad1a235-0d9c-410a-b32b-220d91689a08'),
    new BrandId('5ad1a235-0d9c-410a-b32b-220d91689a08')
  ),
  new ModelSeries(
    new ModelSeriesId('01a9328f-2554-4a5e-8c88-3375e3a1d88c'),
    new ModelSeriesName('HightPrint 4915+'),
    new CategoryId('5ad1a235-0d9c-410a-b32b-220d91689a08'),
    new BrandId('5ad1a235-0d9c-410a-b32b-220d91689a08')
  ),
  new ModelSeries(
    new ModelSeriesId('e3d95984-c747-4acf-b29f-46d1f2dd23aa'),
    new ModelSeriesName('LaserJet P2015dn'),
    new CategoryId('241bf55d-b649-4109-af7c-0e6890ded3fc'),
    new BrandId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3')
  )
]

export class InMemoryModelSeriesRepository implements ModelSeriesRepository {
  async searchAll (): Promise<ModelSeries[]> {
    return modelSeries
  }

  async searchById (id: ModelSeriesId): Promise<ModelSeries | null> {
    return modelSeries.find(brand => brand.IdValue === String(id)) ?? null
  }

  async searchByName (name: ModelSeriesName): Promise<ModelSeries | null> {
    return modelSeries.find(brand => brand.nameValue.toLowerCase().trim() === String(name).toLowerCase().trim()) ?? null
  }

  async save (payload: ModelSeries): Promise<void> {
    const index = modelSeries.findIndex(model => model.IdValue === payload.IdValue)
    if (index === -1) {
      modelSeries.push(payload)
    } else {
      modelSeries[index] = payload
    }
  }

  async remove (id: ModelSeriesId): Promise<void> {
    modelSeries.filter(brand => brand.IdValue !== String(id))
  }
}
