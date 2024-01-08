import { notFound } from '@hapi/boom'
import { type DeviceOutput } from '../../domain/entities/DeviceAggregation/device.entity'
import { type Repository } from '../../domain/repositories/respoitory'
import { type Id } from '../../types/types'

export async function getDeviceById ({ id, repository }: { id: Id, repository: Repository }): Promise<DeviceOutput | undefined> {
  const data = await repository.device.getById(id)
  if (data === undefined) {
    throw notFound('Dispositivo no encontrado')
  }
  return data
}
