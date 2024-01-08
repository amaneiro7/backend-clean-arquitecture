import { notFound } from '@hapi/boom'
import { type Brand } from '../../domain/entities/DeviceAggregation/brand.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getBrandByName ({ name, repository }: { name: string, repository: Repository }): Promise<Brand | undefined> {
  const data = await repository.brand.getByName(name)
  if (data === undefined) {
    throw notFound('Marca no encontrada')
  }
  return data
}
