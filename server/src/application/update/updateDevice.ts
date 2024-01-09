import { notFound } from '@hapi/boom'
import { type DeviceOutput, type UpdateDevice } from '../../domain/entities/Device/device.entity'
import { type Repository } from '../../domain/repositories/respoitory'
import { type Id } from '../../types/types'

interface Props {
  id: Id
  payload: UpdateDevice
  repository: Repository
}

export async function updateDevice ({ id, payload, repository }: Props): Promise<DeviceOutput | undefined> {
  const deviceToChange = await repository.device.getById(id)
  if (deviceToChange === undefined || deviceToChange === null) {
    throw notFound('Modelo no encontrado')
  }
  const mappedUpdateDevice: UpdateDevice = Object.assign({}, payload)
  if (payload?.serial !== undefined) {
    mappedUpdateDevice.serial = formatEmptyUndefinedValue(payload.serial)
  }
  if (payload?.activo !== undefined) {
    mappedUpdateDevice.activo = formatEmptyUndefinedValue(payload.activo)
  }

  return await repository.device.update(id, mappedUpdateDevice)
}

function formatEmptyUndefinedValue (value: string | undefined | null): string | null {
  if (value === undefined || value === null || value === '') return null
  return value
}
