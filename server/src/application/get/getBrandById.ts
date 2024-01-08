import { notFound } from '@hapi/boom'
import { type Brand } from '../../domain/entities/DeviceAggregation/brand.entity'
import { type Repository } from '../../domain/repositories/respoitory'
import { type Id } from '../../types/types'

export async function getBrandById ({ id, repository }: { id: Id, repository: Repository }): Promise<Brand | undefined> {
  const data = await repository.brand.getById(id)
  if (data === undefined) {
    throw notFound('Marca no encontrada')
  }
  return data
}
