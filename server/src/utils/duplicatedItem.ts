import { conflict } from '@hapi/boom'
import { type Brand } from '../domain/entities/DeviceAggregation/brand.entity'
import { type Category } from '../domain/entities/DeviceAggregation/category.entity'
import { type ModelSeries } from '../domain/entities/DeviceAggregation/modelSeries.entity'

interface Props {
  array: Brand[] | Category[] | ModelSeries[]
  name: string
}
export function duplicatedItem ({ array, name }: Props): undefined {
  const result = array.find(elem => elem.name === name)
  if (result !== undefined) {
    throw conflict('El elemento ya existe')
  }
  return result
}
