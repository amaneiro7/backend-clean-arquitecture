import { type CreateDevice, type DeviceOutput } from '../../domain/entities/Device/device.entity'
import { type Repository } from '../../domain/repositories/respoitory'

interface Props {
  payload: CreateDevice
  repository: Repository
}

export async function createNewDevice ({ payload, repository }: Props): Promise<DeviceOutput | undefined> {
  let { activo, modelId, serial, status } = payload
  serial = formatEmptyUndefinedValue(serial)
  activo = formatEmptyUndefinedValue(activo)
  const mappedNewDevice = {
    activo,
    serial,
    status,
    modelId
  }
  //   await createFunction({ storeName: 'Modelo', payload, store: repository.modelSeries })
  return await repository.device.create(mappedNewDevice)
}

function formatEmptyUndefinedValue (value: string | undefined | null): string | null {
  if (value === undefined || value === null || value === '') return null
  return value
}
