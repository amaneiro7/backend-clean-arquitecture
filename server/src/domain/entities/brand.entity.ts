import { type Id } from '../../src/types/types'

export interface Brand {
  id: Id
  name: string
}

export interface CreateBrand extends Omit<Brand, 'id'> {}
export interface UpdateBrand extends Partial<CreateBrand> {}
