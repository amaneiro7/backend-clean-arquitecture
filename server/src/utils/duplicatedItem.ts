import { conflict } from '@hapi/boom'
import { type Brand } from '../domain/entities/brand.entity'
import { type Category } from '../domain/entities/category.entity'
import { type ModelSeries } from '../domain/entities/modelSeries.entity'

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
