import { randomUUID } from 'node:crypto'
import { type Id } from '../../../types/types'
import { type DeviceOutput, type Device, type CreateDevice, type UpdateDevice } from '../../../domain/entities/device.entity'
import { type DeviceRepository } from '../../../domain/repositories/device.repositories'
import { modelSeriesService } from '../../../dependecies/modelSeries.dependecies'

const device: Device[] = [
  {
    id: '5a94384b-2e4d-4cdf-96c9-0065bf7f92a0',
    activo: '202370',
    serial: 'MXL5004170',
    status: 'Operativo',
    modelId: 'd3237ea9-2e2b-438b-a3d3-954a3ffae5f7'
  },
  {
    id: '5a94384b-2e4d-4cdf-96c9-0065bf7f92a9',
    activo: 'AR001002030',
    serial: 'CNC7070702',
    status: 'Dañado',
    modelId: 'd696340e-cc33-4320-be42-e58554f4bf51'
  },
  {
    id: '230b68a0-3fcc-44e8-90fe-f740237dc841',
    activo: null,
    serial: '5605209372',
    status: 'Operativo',
    modelId: '9f95946f-be67-4ea5-bcef-86ce115618cc'
  },
  {
    id: 'd5c58353-3024-491b-8956-e0528391e94d',
    activo: null,
    serial: '5004095077',
    status: 'Operativo',
    modelId: '9f95946f-be67-4ea5-bcef-86ce115618cc'
  },
  {
    id: 'e6e02d1b-2439-4b2c-bf2c-c48edb202af3',
    activo: null,
    serial: '5605274461',
    status: 'Operativo',
    modelId: '01a9328f-2554-4a5e-8c88-3375e3a1d88c'
  },
  {
    id: '37dd1e98-8b43-4b9e-ac62-72ca37dabae7',
    activo: null,
    serial: 'CNBJS97096',
    status: 'Operativo',
    modelId: 'e3d95984-c747-4acf-b29f-46d1f2dd23aa'
  }
]
export class DeviceRepositoryInMemory implements DeviceRepository {
  getAll = async (): Promise<DeviceOutput[]> => {
    const data = await this.dataFormatter(device)
    return data
  }

  dataFormatter = async (array: Device[]): Promise<DeviceOutput[]> => {
    const data: DeviceOutput[] = []
    await Promise.all(array.map(async (model) => {
      const dataFormatting = await this.joinRelationalTables(model)
      data.push(dataFormatting)
    }))
    return data
  }

  joinRelationalTables = async (model: Device): Promise<DeviceOutput> => {
    const modelSeries = await modelSeriesService.getOne({ id: model.modelId })

    if (modelSeries === undefined) {
      throw new Error('Error interno')
    }
    const data = {
      ...model,
      model: modelSeries
    }
    const { modelId, ...result } = data
    return result
  }

  getOne = async ({ id }: { id: Id }): Promise<DeviceOutput | undefined> => {
    const modelSerie = device.find(modelSerie => modelSerie.id === id)
    if (modelSerie === undefined) {
      throw new Error('Error interno')
    }
    return await this.joinRelationalTables(modelSerie)
  }

  create = async (payload: CreateDevice): Promise <DeviceOutput> => {
    const newModelSerie = {
      id: randomUUID(),
      ...payload
    }
    device.push(newModelSerie)
    return await this.joinRelationalTables(newModelSerie)
  }

  update = async (id: Id, payload: UpdateDevice): Promise<DeviceOutput | undefined> => {
    const modelSerieIndex = device.findIndex(modelSerie => modelSerie.id === id)
    if (modelSerieIndex === -1) {
      throw new Error('Error interno')
    }
    device[modelSerieIndex] = {
      ...device[modelSerieIndex],
      ...payload
    }

    return await this.joinRelationalTables(device[modelSerieIndex])
  }
}
