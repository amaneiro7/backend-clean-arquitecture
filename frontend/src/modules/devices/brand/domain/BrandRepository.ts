import { type Brand, type BrandCreate } from './Brand'

export abstract class BrandRepository {
  abstract save ({ brand }: { brand: BrandCreate }): Promise<void>

  abstract update ({ id, brand }: { id: string, brand: BrandCreate }): Promise<void>

  abstract getAll (): Promise<Brand[]>

  abstract getById ({ id }: { id: string }): Promise<Brand | null>

  abstract getByName ({ name }: { name: string }): Promise<Brand | null>
}
