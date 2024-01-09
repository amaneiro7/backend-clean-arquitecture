import { conflict } from '@hapi/boom'
import { type Brand } from '../domain/entities/Device/brand.entity'
import { type Category } from '../domain/entities/Device/category.entity'
import { type ModelSeries } from '../domain/entities/Device/modelSeries.entity'

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
