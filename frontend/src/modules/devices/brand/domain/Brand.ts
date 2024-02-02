import { BrandNameNotValidError, isBrandNameValid } from './BrandName'

export interface Brand {
  id: string
  name: string
}

export interface BrandCreate extends Omit<Brand, 'id'> {}

export interface BrandUpdate extends Partial<BrandCreate> {}

export function ensureBrandIsValid ({ name }: BrandCreate): void {
  if (!isBrandNameValid(name)) {
    throw BrandNameNotValidError(name)
  }
}
